#!/usr/bin/env bun

import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { parseArgs, REPO_ROOT_FLAG } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  GIT_CREDENTIAL_ARGS,
  gitCredentialEnv,
  transportUrl,
} from "../../modules/git-transport-credential/git-transport-credential.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"
import {
  type SeamFn,
  validateWorkspacesAgainstSeam,
  type WorkspacesSeamResult,
} from "../../modules/workspaces-mainseam/workspaces-mainseam.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[workspaces-mainseam]"
const SEAM_PATH = "akasha/workspace-paths/workspace-dirs/workspace-dirs.module.code.ts"

function readMainSeamSource(repoRoot: string): string {
  execFileSync(
    "git",
    [...GIT_CREDENTIAL_ARGS, "fetch", "--force", transportUrl("alan/akasha.git"), "main"],
    {
      cwd: repoRoot,
      stdio: "pipe",
      encoding: "utf8",
      env: gitCredentialEnv(),
    }
  )
  return execFileSync("git", ["show", `FETCH_HEAD:${SEAM_PATH}`], {
    cwd: repoRoot,
    encoding: "utf8",
  })
}

async function loadMainSeam(repoRoot: string): Promise<SeamFn> {
  const source = readMainSeamSource(repoRoot)
  const dir = mkdtempSync(join(tmpdir(), "mainseam-"))
  try {
    symlinkSync(join(repoRoot, "node_modules"), join(dir, "node_modules"), "dir")
    const file = join(dir, "index.ts")
    writeFileSync(file, source)
    const mod = await import(file)
    if (typeof mod.listWorkspaceDirs !== "function") {
      throw new Error(`deployed-main seam at ${SEAM_PATH} has no listWorkspaceDirs export`)
    }
    const seam: SeamFn = (root) => mod.listWorkspaceDirs(root)
    return seam
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

async function main(): Promise<undefined> {
  const repoRoot =
    parseArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
    getRepoRoot()
  let result: WorkspacesSeamResult
  try {
    const seam = await loadMainSeam(repoRoot)
    result = validateWorkspacesAgainstSeam(seam, repoRoot)
  } catch (error) {
    return exitOnToolError({ error, prefix: PREFIX })
  }
  exitOnResult({
    violations: result.violations,
    options: {
      population: result.population,
      prefix: PREFIX,
      header:
        "root package.json#workspaces must be parseable by the deployed-main workspace-paths seam",
      successMessage:
        "root package.json#workspaces is parseable by the deployed-main seam (merge-queue forming safe).",
    },
  })
}

await main()
