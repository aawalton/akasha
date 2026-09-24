import { buildInteractiveCLIArgs } from "akasha/agent/claude-code/modules/claude-launch-args/claude-launch-args.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import type { SeatResume } from "akasha/agent/seat/supervisor/modules/supervisor-args/supervisor-args.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { setOAuthProxyHandle } from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import type { AgentProcess } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import type { CarriedAgentName } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-rebind-carry/supervisor-rebind-carry.module.code.ts"
import type { ClearRebindDeps } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import type { spawnClaudeChild } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-adopt/supervisor-adopt.module.code.ts"
import { processCleanup } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-agent-cleanup/supervisor-agent-cleanup.module.code.ts"
import {
  disallowedToolsForLaunch,
  resolveSubagentDefinitions,
} from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-spawn-agent/supervisor-spawn-agent.module.code.ts"
import { materializeSpawnSettings } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"
import {
  resolveAgentEffortLevel,
  resolveAutoCompactWindow,
  resolveResumeThresholds,
  resolveSubagentModel,
  resolveSubagentSpawnDepth,
  resolveToolTimeout,
  resolveWorkerModel,
} from "akasha/agent/seat/supervisor/seat-claude-code-setup/modules/supervisor-account-config/supervisor-account-config.module.code.ts"
import { materializeBootPrompt } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-boot-prompt/supervisor-boot-prompt.module.code.ts"
import { stage } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-boot-stage/supervisor-boot-stage.module.code.ts"
import type {
  InteractiveOpts,
  InteractiveSessionBoot,
} from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import { armForceExitTimer } from "akasha/agent/seat/supervisor/supervisor-stop/modules/supervisor-lifecycle/supervisor-lifecycle.module.code.ts"
import { resolveMcpConfig } from "akasha/agent/seat/supervisor/supervisor-tooling/modules/supervisor-mcp/supervisor-mcp.module.code.ts"
import { isPendingReExec } from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"

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
  iterMcpPath: ReturnType<typeof resolveMcpConfig>
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

  const iterMcpPath = resolveMcpConfig(mcpConfigNonce, { configDir, cwd })
  if (iterMcpPath != null) {
    console.log(`${LOG} MCP config: ${iterMcpPath}`)
  }

  const autoCompactWindowAsked = stage("auto-compact-window", resolveAutoCompactWindow())
  const effortLevelAsked = stage("agent-effort-level", resolveAgentEffortLevel())
  const subagentModelAsked = stage("subagent-model", resolveSubagentModel())
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
    subagentSpawnDepth,
    toolTimeout,
    resumeThresholds,
    agentsJson,
    systemPromptFile,
  ] = await Promise.all([
    autoCompactWindowAsked,
    effortLevelAsked,
    subagentModelAsked,
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
    sessionName: seatNameForAgent(agentId),
    remoteControlName: remoteControlOn ? seatNameForAgent(agentId) : null,
    systemPromptFile,
    model,
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

    if (!isPendingReExec()) {
      proxy.stop()
      setOAuthProxyHandle(null)
    }

    if (agentProc) await processCleanup(agentProc)
  } finally {
    disarmCleanupBackstop()
  }
}
