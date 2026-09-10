import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"
import { claimSeatSupervision } from "akasha/seat-system/supervising/seat-supervisor-claim/seat-supervisor-claim.module.code.ts"
import { createAgent } from "akasha/seat-system/supervising/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import type { SeatResume } from "akasha/seat-system/supervising/supervisor-args/supervisor-args.module.code.ts"
import { liveChildExitRule } from "akasha/seat-system/supervising/supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import { spawnOrAdoptChild } from "akasha/seat-system/supervising/supervisor-child-spawn/supervisor-child-spawn.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/seat-system/supervising/supervisor-console/supervisor-console.module.code.ts"
import {
  ANNOUNCE,
  sendMessage,
  USER_SOURCE,
} from "akasha/seat-system/supervising/supervisor-limit-resume-send/supervisor-limit-resume-send.module.code.ts"
import type { ClearRebindHooks } from "akasha/seat-system/supervising/supervisor-rebind/supervisor-rebind.module.code.ts"
import type { CarriedAgentName } from "akasha/seat-system/supervising/supervisor-rebind-carry/supervisor-rebind-carry.module.code.ts"
import type { ClearRebindDeps } from "akasha/seat-system/supervising/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import type { AgentIdHandle } from "akasha/seat-system/supervising/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import { sessionProjectDir } from "akasha/seat-system/supervising/supervisor-session-project-dir/supervisor-session-project-dir.module.code.ts"
import {
  processes,
  setRestoreConsoleHandle,
} from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import type {
  AgentProcess,
  InheritedProc,
} from "akasha/seat-system/supervising/supervisor-types/supervisor-types.module.code.ts"
import { readOwnTranscriptTail } from "../../agent-io-probe/agent-io-probe.module.code.ts"
import { reconcileClaimedRedelivery } from "../../messaging/supervisor-claimed-reconcile/supervisor-claimed-reconcile.module.code.ts"
import {
  readClaimedBefore,
  releaseMessageClaim,
} from "../../messaging/supervisor-message-claim/supervisor-message-claim.module.code.ts"
import { redeliveryHoldoff } from "../../messaging/supervisor-redelivery-holdoff/supervisor-redelivery-holdoff.module.code.ts"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "../../self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
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
