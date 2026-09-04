import { mkdtemp, rm } from "node:fs/promises"
import { homedir, tmpdir } from "node:os"
import { join } from "node:path"
import { requireEnv } from "@akasha/utils-narrow/require-env"
import { z } from "zod"
import {
  DIRECT_BUILDKIT_HOST,
  DIRECT_BUILDKIT_PORT,
  DIRECT_REGISTRY_HOST,
  DIRECT_REGISTRY_PORT,
  isPortOpen,
} from "../cluster-access/cluster-access.module.code.ts"
import { executeStepOnce } from "../local-step-execution/local-step-execution.module.code.ts"
import type {
  PipelineContext,
  StepConfig,
  StepResult,
} from "../local-step-types/local-step-types.module.code.ts"
import { pruneLocalLogs, streamProcessOutput } from "../output-tee/output-tee.module.code.ts"

export interface LocalExecutor {
  workspaceMountPath: () => string
  createWorkspace: (sha: string, pipelineNumber: number, workflowName: string) => Promise<string>
  deleteWorkspace: (sha: string, pipelineNumber: number, workflowName: string) => Promise<void>
  cloneRepo: (
    repoFullName: string,
    sha: string,
    branch: string,
    pipelineNumber: number,
    workflowName: string,
    workspacePath: string,
    workspaceName: string
  ) => Promise<StepResult>
  executeStep: (step: StepConfig, context: PipelineContext) => Promise<StepResult>
}

export function LocalExecutor(): LocalExecutor {
  void pruneLocalLogs()

  let workspacePath: string | undefined

  let directBuildkit: boolean | undefined
  let directRegistry: boolean | undefined

  const forcePortForward =
    (z.string().optional().parse(process.env["LOCAL_EXECUTOR_FORCE_PORT_FORWARD"]) ?? "") !== ""

  async function isBuildkitDirect(): Promise<boolean> {
    if (forcePortForward) return false
    if (directBuildkit !== undefined) return directBuildkit
    directBuildkit = await isPortOpen(DIRECT_BUILDKIT_HOST, DIRECT_BUILDKIT_PORT)
    if (directBuildkit) {
      console.log(
        `[local-executor] BuildKit reachable directly at ${DIRECT_BUILDKIT_HOST}:${DIRECT_BUILDKIT_PORT} — skipping port-forward`
      )
    }
    return directBuildkit
  }

  async function isRegistryDirect(): Promise<boolean> {
    if (forcePortForward) return false
    if (directRegistry !== undefined) return directRegistry
    directRegistry = await isPortOpen(DIRECT_REGISTRY_HOST, DIRECT_REGISTRY_PORT)
    if (directRegistry) {
      console.log(
        `[local-executor] Registry reachable directly at ${DIRECT_REGISTRY_HOST}:${DIRECT_REGISTRY_PORT} — skipping port-forward`
      )
    }
    return directRegistry
  }

  function workspaceMountPath(): string {
    if (workspacePath == null) throw new Error("Workspace not created yet")
    return workspacePath
  }

  async function createWorkspace(
    _sha: string,
    _pipelineNumber: number,
    _workflowName: string
  ): Promise<string> {
    workspacePath = await mkdtemp(join(tmpdir(), "pe-local-"))
    return workspacePath
  }

  async function deleteWorkspace(
    _sha: string,
    _pipelineNumber: number,
    _workflowName: string
  ): Promise<void> {
    if (workspacePath != null) {
      await rm(workspacePath, { recursive: true, force: true })
      workspacePath = undefined
    }
  }

  async function cloneRepo(
    _repoFullName: string,
    sha: string,
    _branch: string,
    _pipelineNumber: number,
    _workflowName: string,
    workspacePath: string,
    _workspaceName: string
  ): Promise<StepResult> {
    const startTime = Date.now()
    try {
      const run = async (...args: readonly string[]) => {
        const proc = Bun.spawn([...args], { stdout: "pipe", stderr: "pipe" })
        const { exitCode, tail } = await streamProcessOutput({
          proc,
          prefix: `[clone] `,
          terminal: { stderr: process.stderr },
        })
        if (exitCode !== 0) {
          const t = (await tail()).trim()
          throw new Error(`${args[0]} ${args[1]} failed (exit ${exitCode}): ${t}`)
        }
      }

      const localRepo = join(homedir(), "repos", "akasha")
      const remoteUrl = `http://x-access-token:${requireEnv("GIT_ACCESS_TOKEN")}@git-transport.git.svc.cluster.local:3000/alan/akasha.git`

      await run("git", "init", workspacePath)
      try {
        await run("git", "-C", workspacePath, "fetch", "--depth", "1", localRepo, sha)
      } catch {
        await run("git", "-C", workspacePath, "fetch", "--depth", "1", remoteUrl, sha)
      }
      await run("git", "-C", workspacePath, "checkout", "FETCH_HEAD")

      Bun.spawnSync(["find", workspacePath, "-name", "*.sh", "-exec", "chmod", "+x", "{}", "+"])

      return {
        success: true,
        logs: "Clone complete",
        exitCode: 0,
        duration: Date.now() - startTime,
      }
    } catch (error) {
      return {
        success: false,
        logs: String(error),
        exitCode: 1,
        duration: Date.now() - startTime,
      }
    }
  }

  async function executeStep(step: StepConfig, context: PipelineContext): Promise<StepResult> {
    return executeStepOnce(step, context, { isBuildkitDirect, isRegistryDirect })
  }

  return {
    workspaceMountPath,
    createWorkspace,
    deleteWorkspace,
    cloneRepo,
    executeStep,
  }
}
