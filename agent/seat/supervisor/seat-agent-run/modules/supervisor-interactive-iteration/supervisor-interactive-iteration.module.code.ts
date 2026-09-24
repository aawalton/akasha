import {
  readClaimedBefore,
  releaseMessageClaim,
} from "akasha/agent/message/modules/supervisor-claim/agent-message-supervisor-claim.module.code.ts"
import { reconcileClaimedRedelivery } from "akasha/agent/message/modules/supervisor-claimed-reconcile/agent-message-supervisor-claimed-reconcile.module.code.ts"
import { redeliveryHoldoff } from "akasha/agent/message/modules/supervisor-redelivery-holdoff/agent-message-supervisor-redelivery-holdoff.module.code.ts"
import { readOwnTranscriptTail } from "akasha/agent/modules/io-probe/io-probe.module.code.ts"
import type { SeatResume } from "akasha/agent/seat/supervisor/modules/supervisor-args/supervisor-args.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type { AgentIdHandle } from "akasha/agent/seat/supervisor/modules/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import { sessionProjectDir } from "akasha/agent/seat/supervisor/modules/supervisor-session-project-dir/supervisor-session-project-dir.module.code.ts"
import {
  processes,
  setRestoreConsoleHandle,
} from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import type {
  AgentProcess,
  InheritedProc,
} from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import type { SessionWatchStart } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-interactive-seams/supervisor-interactive-seams.module.code.ts"
import type { CarriedAgentName } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-rebind-carry/supervisor-rebind-carry.module.code.ts"
import type { ClearRebindDeps } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import { createAgent } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import { spawnOrAdoptChild } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-child-spawn/supervisor-child-spawn.module.code.ts"
import {
  applyCarriedName,
  buildIterationSpawnOpts,
  type SeatSpawnDecider,
} from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"
import {
  ANNOUNCE,
  sendMessage,
  USER_SOURCE,
} from "akasha/agent/seat/supervisor/seat-work-restart/modules/supervisor-limit-resume-send/supervisor-limit-resume-send.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import { claimSeatSupervision } from "akasha/agent/seat/supervisor/supervisor-start/modules/seat-supervisor-claim/seat-supervisor-claim.module.code.ts"
import type {
  InteractiveOpts,
  InteractiveSessionBoot,
} from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import { keepSeatTranscript } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import {
  setCurrentAgentIdForRestart,
  setCurrentSessionIdForRestart,
} from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"
import { USER_ID } from "akasha/alan/harness/supabase-auth/modules/user-id/user-id.module.code.ts"

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
  setCurrentAgentIdForRestart(agentId)
  setCurrentSessionIdForRestart(sessionId)
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
  startSessionWatch: SessionWatchStart
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
