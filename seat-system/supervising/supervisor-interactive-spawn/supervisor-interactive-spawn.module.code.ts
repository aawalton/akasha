import {
  resolveAgentEffortLevel,
  resolveAutoCompactWindow,
  resolveFallbackModel,
  resolveResumeThresholds,
  resolveSubagentModel,
  resolveSubagentSpawnDepth,
  resolveToolTimeout,
  resolveWorkerModel,
} from "@akasha/seat-system/supervisor-account-config"
import type { spawnClaudeChild } from "@akasha/seat-system/supervisor-adopt"
import { processCleanup } from "@akasha/seat-system/supervisor-agent-cleanup"
import type { SeatResume } from "@akasha/seat-system/supervisor-args"
import { materializeBootPrompt } from "@akasha/seat-system/supervisor-boot-prompt"
import { stage } from "@akasha/seat-system/supervisor-boot-stage"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { armForceExitTimer } from "@akasha/seat-system/supervisor-lifecycle"
import { resolveMcpConfig } from "@akasha/seat-system/supervisor-mcp"
import type { CarriedAgentName } from "@akasha/seat-system/supervisor-rebind-carry"
import type { ClearRebindDeps } from "@akasha/seat-system/supervisor-rebind-deps"
import { isPendingReExec } from "@akasha/seat-system/supervisor-self-heal-state"
import {
  disallowedToolsForLaunch,
  resolveSubagentDefinitions,
} from "@akasha/seat-system/supervisor-spawn-agents"
import { materializeSpawnSettings } from "@akasha/seat-system/supervisor-spawn-settings"
import { setOAuthProxyHandle } from "@akasha/seat-system/supervisor-state"
import type { AgentProcess } from "@akasha/seat-system/supervisor-types"
import { buildInteractiveCLIArgs } from "../../claude-launch-args/claude-launch-args.module.code.ts"
import type {
  InteractiveOpts,
  InteractiveSessionBoot,
} from "../supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"

export type SeatSpawnDecider = (
  agentId: string | null,
  opts: { headless: boolean }
) => Promise<{
  readonly remoteControl: boolean
}>

export async function applyCarriedName(
  agentId: string,
  carried: CarriedAgentName | null,
  bindAgentName: ClearRebindDeps["bindAgentName"]
): Promise<void> {
  if (carried === null) return
  try {
    await bindAgentName(agentId, carried.name, carried.title, carried.slots)
  } catch (err) {
    console.error(`${LOG} Failed to carry name onto reset successor ${agentId}:`, err)
  }
}

export async function buildIterationSpawnOpts(args: {
  opts: InteractiveOpts
  agentId: string
  configDir: string
  cwd: string
  mcpConfigNonce: string
  restrictions: InteractiveSessionBoot["restrictions"]
  resume: SeatResume
  sessionId: string
  currentPrompt: string
  anthropicBaseUrl: string
  proxy: InteractiveSessionBoot["proxy"]
  resolveSeatSpawnDecisions: SeatSpawnDecider
}): Promise<{
  iterMcpPath: Awaited<ReturnType<typeof resolveMcpConfig>>
  spawnOpts: Parameters<typeof spawnClaudeChild>[0]
  bootPromptPath: string | null
}> {
  const {
    opts,
    agentId,
    configDir,
    cwd,
    mcpConfigNonce,
    restrictions,
    resume,
    sessionId,
    currentPrompt,
    anthropicBaseUrl,
    proxy,
    resolveSeatSpawnDecisions,
  } = args

  const iterMcpPath = await resolveMcpConfig(mcpConfigNonce, { configDir, cwd })
  if (iterMcpPath != null) {
    console.log(`${LOG} MCP config: ${iterMcpPath}`)
  }

  const autoCompactWindowAsked = stage("auto-compact-window", resolveAutoCompactWindow())
  const effortLevelAsked = stage("agent-effort-level", resolveAgentEffortLevel())
  const subagentModelAsked = stage("subagent-model", resolveSubagentModel())
  const fallbackModelAsked = stage("fallback-model", resolveFallbackModel())
  const spawnDepthAsked = stage("subagent-spawn-depth", resolveSubagentSpawnDepth())
  const toolTimeoutAsked = stage("tool-timeout", resolveToolTimeout())
  const resumeThresholdsAsked = stage("resume-thresholds", resolveResumeThresholds())
  const agentsJsonAsked = stage("subagent-definitions", resolveSubagentDefinitions())
  const systemPromptFileAsked = stage("boot-prompt", materializeBootPrompt(agentId))

  const seatDecisions = await stage(
    "seat-spawn-decisions",
    resolveSeatSpawnDecisions(agentId, { headless: opts.headless })
  )
  const remoteControlOn = seatDecisions.remoteControl

  const [model, settingsPath] = await Promise.all([
    opts.modelOverride ?? stage("worker-model", resolveWorkerModel()),
    stage("spawn-settings", materializeSpawnSettings({ remoteControlAtStartup: remoteControlOn })),
  ])
  const [
    autoCompactWindow,
    effortLevel,
    subagentModel,
    fallbackModel,
    subagentSpawnDepth,
    toolTimeout,
    resumeThresholds,
    agentsJson,
    systemPromptFile,
  ] = await Promise.all([
    autoCompactWindowAsked,
    effortLevelAsked,
    subagentModelAsked,
    fallbackModelAsked,
    spawnDepthAsked,
    toolTimeoutAsked,
    resumeThresholdsAsked,
    agentsJsonAsked,
    systemPromptFileAsked,
  ])

  const cliArgs = buildInteractiveCLIArgs({
    mcpConfigPath: iterMcpPath,
    tools: restrictions.tools,
    disallowedTools: disallowedToolsForLaunch(restrictions.disallowedTools, agentsJson),
    resume,
    sessionId,
    systemPromptFile,
    model,
    fallbackModel,
    settingsPath,
    agentsJson,
  })
  if (resume.resume) console.log(`${LOG} resume driver: ${resume.driver}`)
  const spawnOpts = {
    cliArgs,
    currentPrompt,
    cwd,
    agentId,
    sessionId,
    configDir,
    anthropicBaseUrl,
    anthropicAuthToken: opts.anthropicAuthToken,
    headless: opts.headless,
    remoteControlOn,
    proxySocketPath: proxy.socketPath,
    autoCompactWindow: autoCompactWindow ?? undefined,
    effortLevel: effortLevel ?? undefined,
    subagentModel: subagentModel ?? undefined,
    subagentSpawnDepth,
    toolTimeout,
    resumeThresholdMinutes: resumeThresholds.minutes,
    resumeTokenThreshold: resumeThresholds.tokens,
  }
  return { iterMcpPath, spawnOpts, bootPromptPath: systemPromptFile }
}

export async function finalizeInteractiveExit(args: {
  agentProc: AgentProcess | undefined
  proxy: InteractiveSessionBoot["proxy"]
}): Promise<void> {
  const { agentProc, proxy } = args
  const disarmCleanupBackstop = armForceExitTimer("post-loop-cleanup")
  try {
    agentProc?.stopSessionWatch?.()
    agentProc?.stopSessionRotatedWatch?.()

    if (!isPendingReExec()) {
      proxy.stop()
      setOAuthProxyHandle(null)
    }

    if (agentProc) await processCleanup(agentProc)
  } finally {
    disarmCleanupBackstop()
  }
}
