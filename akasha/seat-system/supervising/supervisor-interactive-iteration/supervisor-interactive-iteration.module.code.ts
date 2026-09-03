import { createAgent } from "@akasha/seat-system/supervisor-agent-create"
import type { SeatResume } from "@akasha/seat-system/supervisor-args"
import { liveChildExitRule } from "@akasha/seat-system/supervisor-child-exit-rule"
import { spawnOrAdoptChild } from "@akasha/seat-system/supervisor-child-spawn"
import { reconcileClaimedRedelivery } from "@akasha/seat-system/supervisor-claimed-reconcile"
import { LOG } from "@akasha/seat-system/supervisor-config"
import type { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import type { ClearRebindHooks } from "@akasha/seat-system/supervisor-rebind"
import type { CarriedAgentName } from "@akasha/seat-system/supervisor-rebind-carry"
import type { ClearRebindDeps } from "@akasha/seat-system/supervisor-rebind-deps"
import { redeliveryHoldoff } from "@akasha/seat-system/supervisor-redelivery-holdoff"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "@akasha/seat-system/supervisor-self-heal-state"
import type { AgentIdHandle } from "@akasha/seat-system/supervisor-self-identity"
import { processes, setRestoreConsoleHandle } from "@akasha/seat-system/supervisor-state"
import type { AgentProcess, InheritedProc } from "@akasha/seat-system/supervisor-types"
import { readOwnTranscriptTail } from "@tools/lib/agent-io-probe"
import { claimSeatSupervision } from "@tools/lib/seat-supervisor-claim"
import { ANNOUNCE, sendMessage, USER_SOURCE } from "@tools/lib/supervisor-limit-resume-send"
import { readClaimedBefore, releaseMessageClaim } from "@tools/lib/supervisor-message-claim"
import { sessionProjectDir } from "@tools/lib/supervisor-session-project-dir"
import { USER_ID } from "@tools/lib/user-id"
import { keepSeatTranscript } from "../supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import type {
  InteractiveOpts,
  InteractiveSessionBoot,
} from "../supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import {
  applyCarriedName,
  buildIterationSpawnOpts,
  type SeatSpawnDecider,
} from "../supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"

export async function openIteration(args: {
  agentId: string | null
  sessionId: string
  selectedAccount: string
  launch: InteractiveSessionBoot["launch"]
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  agentIdHandle: AgentIdHandle
  pendingCarriedName: CarriedAgentName | null
  pendingUserPrompt: string | null
  setPendingCarriedName: (value: CarriedAgentName | null) => void
  setPendingUserPrompt: (value: string | null) => void
  bindAgentName: ClearRebindDeps["bindAgentName"]
  setSessionId: ClearRebindDeps["setSessionId"]
}): Promise<string> {
  const { agentIdHandle, sessionId } = args
  let agentId = args.agentId
  if (agentId == null) {
    agentId = await createAgent(args.selectedAccount, args.launch)
    setRestoreConsoleHandle(args.agentLog.redirectTo(agentId))
    await applyCarriedName(agentId, args.pendingCarriedName, args.bindAgentName)
    args.setPendingCarriedName(null)
    if (args.pendingUserPrompt !== null) {
      try {
        await sendMessage({
          targetAgentId: agentId,
          userId: USER_ID,
          content: args.pendingUserPrompt,
          source: USER_SOURCE,
          warrant: ANNOUNCE,
        })
      } catch (err) {
        console.error(`${LOG} Failed to deliver reset prompt to ${agentId}:`, err)
      }
      args.setPendingUserPrompt(null)
    }
  } else {
    console.log(`${LOG} Restarting agent ${agentId}`)
  }
  agentIdHandle.bind(agentId)
  setCurrentAgentIdForSelfHeal(agentId)
  setCurrentSessionIdForSelfHeal(sessionId)
  try {
    await args.setSessionId(agentId, sessionId)
  } catch (err) {
    console.error(`${LOG} Failed to set sessionId on agent ${agentId}:`, err)
  }
  claimSeatSupervision(agentId)
  return agentId
}

export async function acquireIterationChild(args: {
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
  adoptOnce: InteractiveSessionBoot["inheritedClaude"]
  iterationCount: number
  recTermios: (tag: string) => undefined
  resolveSeatSpawnDecisions: SeatSpawnDecider
  setAdoptOnce: (value: null) => void
}): Promise<{
  proc: InheritedProc | null
  adoptedThisIter: boolean
  iterMcpPath: Awaited<ReturnType<typeof buildIterationSpawnOpts>>["iterMcpPath"]
}> {
  const { iterMcpPath, spawnOpts } = await buildIterationSpawnOpts({
    opts: args.opts,
    agentId: args.agentId,
    configDir: args.configDir,
    cwd: args.cwd,
    mcpConfigNonce: args.mcpConfigNonce,
    restrictions: args.restrictions,
    resume: args.resume,
    sessionId: args.sessionId,
    currentPrompt: args.currentPrompt,
    anthropicBaseUrl: args.anthropicBaseUrl,
    proxy: args.proxy,
    resolveSeatSpawnDecisions: args.resolveSeatSpawnDecisions,
  })
  args.recTermios(`pre-claude-spawn iter=${args.iterationCount}`)
  const { proc, adoptedThisIter } = spawnOrAdoptChild({
    adoptOnce: args.adoptOnce,
    spawnOpts,
    childExitRule: liveChildExitRule,
  })
  args.setAdoptOnce(null)
  if (proc === null) return { proc: null, adoptedThisIter, iterMcpPath }

  if (args.resume.resume && !adoptedThisIter) {
    const processStartedAtMs = Date.now()
    void reconcileClaimedRedelivery(
      { agentId: args.agentId, processStartedAtMs },
      {
        readClaimed: (id, beforeMs) => readClaimedBefore(id, new Date(beforeMs)),
        readTail: readOwnTranscriptTail,
        release: (messageId) => releaseMessageClaim(args.agentId, messageId),
        waitForRedeliveryWindow: () => redeliveryHoldoff(proc.exited),
      }
    )
  }
  return { proc, adoptedThisIter, iterMcpPath }
}

export function assembleIterationProcess(args: {
  processId: string
  agentId: string
  sessionId: string
  proc: InheritedProc
  selectedAccount: string
  credentialRefreshTimer: InteractiveSessionBoot["credentialRefreshTimer"]
  monitors: InteractiveSessionBoot["monitors"]
  stopCredentialWatch: InteractiveSessionBoot["stopCredentialWatch"]
  iterMcpPath: AgentProcess["mcpConfigPath"]
  adoptedThisIter: boolean
  cwd: string
  configDir: string
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
}): { agentProc: AgentProcess; projDir: string } {
  const agentProc: AgentProcess = {
    process_id: args.processId,
    agent_id: args.agentId,
    user_id: USER_ID,
    session_id: args.sessionId,
    started_at: new Date().toISOString(),
    proc: args.proc,
    interactive: true,
    currentAccount: args.selectedAccount,
    credentialRefreshTimer: args.credentialRefreshTimer,
    ...args.monitors,
    stopCredentialWatch: args.stopCredentialWatch,
    mcpConfigPath: args.iterMcpPath,
    configDir: null,
    adopted: args.adoptedThisIter,
  }

  processes.set(args.processId, agentProc)

  const projDir = sessionProjectDir(args.cwd, args.configDir)
  keepSeatTranscript(args.agentId, `${projDir}/${args.sessionId}.jsonl`)
  agentProc.stopSessionWatch = args.startSessionWatch(args.agentId, args.sessionId, projDir)
  return { agentProc, projDir }
}
