import { buildAgentActionSubsystem } from "akasha/seat-system/supervising/supervisor-agent-action/supervisor-agent-action.module.code.ts"
import {
  clearRequestedAction,
  consumeThenProxySwap,
} from "akasha/seat-system/supervising/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type { PendingAgentAction } from "akasha/seat-system/supervising/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { LIVE_CHILD_EXIT_RULE } from "akasha/seat-system/supervising/supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"
import { wireSessionRotatedWatcher } from "akasha/seat-system/supervising/supervisor-clear-rebind-wire/supervisor-clear-rebind-wire.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/seat-system/supervising/supervisor-console/supervisor-console.module.code.ts"
import { LIVE_DEFERRED_RESTART_RULE } from "akasha/seat-system/supervising/supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"
import { startPreCliffRestartMonitor } from "akasha/seat-system/supervising/supervisor-precliff-restart/supervisor-precliff-restart.module.code.ts"
import { askPreCliffRestart } from "akasha/seat-system/supervising/supervisor-precliff-restart-rule/supervisor-precliff-restart-rule.module.code.ts"
import type { ClearRebindHooks } from "akasha/seat-system/supervising/supervisor-rebind/supervisor-rebind.module.code.ts"
import type { ClearRebindDeps } from "akasha/seat-system/supervising/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import type { AgentIdHandle } from "akasha/seat-system/supervising/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import {
  isShuttingDown,
  setAgentActionHandler,
  setObservedChildExit,
} from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import type {
  AgentProcess,
  InheritedProc,
} from "akasha/seat-system/supervising/supervisor-types/supervisor-types.module.code.ts"
import { triggerProxySwap } from "../../oauth-proxy/supervisor-proxy-version/supervisor-proxy-version.module.code.ts"
import { LIVE_IDLE_RULE } from "../supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
import type { InteractiveSessionBoot } from "../supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"

export interface IterationWiring {
  actionSubsystem: ReturnType<typeof buildAgentActionSubsystem>
  pendingEvent: { value: PendingAgentAction | null }
  deferredRestart: { cancel: (() => void) | null }
  preCliffMonitor: { stop: () => void } | null
  stopSessionRotatedWatch: () => void
}

export async function wireIteration(args: {
  agentId: string
  proc: InheritedProc
  selectedAccount: string
  projDir: string
  agentIdHandle: AgentIdHandle
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  proxy: InteractiveSessionBoot["proxy"]
  getAgentId: () => string | null
  getAgentProc: () => AgentProcess | undefined
  setLoopAgentId: (id: string) => void
  setLoopSessionId: (id: string) => void
  rebindDeps: ClearRebindDeps
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
}): Promise<IterationWiring> {
  const { proc, agentIdHandle, proxy } = args
  const actionSubsystem = buildAgentActionSubsystem({
    idleRule: LIVE_IDLE_RULE,
    deferredRestartRule: LIVE_DEFERRED_RESTART_RULE,
    killProc: () => proc.kill("SIGTERM"),
    getClaudePid: () => proc.pid,
    getAgentId: () => agentIdHandle.id,
    getProxyPort: () => proxy.port,
    log: (line) => console.log(`${LOG} ${line}`),
    onProxySwap: async () => {
      const id = agentIdHandle.id
      if (id == null) return
      await consumeThenProxySwap({
        clear: () => clearRequestedAction(id),
        swap: () => {
          triggerProxySwap()
        },
      })
    },
  })
  const { handleAgentAction, pendingEvent, deferredRestart } = actionSubsystem

  const { value: cliffConstants, notice: cliffNotice } =
    await LIVE_DEFERRED_RESTART_RULE.constants()
  if (cliffConstants === null)
    console.log(
      `${LOG} pre-cliff: monitor NOT started this iteration — the cliff age could not be ` +
        `read: ${cliffNotice ?? "no reason given"}`
    )
  const preCliffMonitor =
    cliffConstants === null
      ? null
      : startPreCliffRestartMonitor({
          getClaudePid: () => proc.pid,
          getAgentId: () => agentIdHandle.id,
          isDeferredArmed: () => deferredRestart.cancel !== null,
          armPreCliff: () => actionSubsystem.armPreCliffRestart(),
          thresholdMs: cliffConstants.EDGE_CONNECTION_CLIFF_PREEMPT_MS,
          preCliffRestartRule: askPreCliffRestart,
          log: (line) => console.log(`${LOG} ${line}`),
        })

  setAgentActionHandler(handleAgentAction)

  const stopSessionRotatedWatch = wireSessionRotatedWatcher({
    selectedAccount: args.selectedAccount,
    projDir: args.projDir,
    deferredRestart,
    agentIdHandle,
    agentLog: args.agentLog,
    getAgentId: args.getAgentId,
    getAgentProc: args.getAgentProc,
    setLoopAgentId: args.setLoopAgentId,
    setLoopSessionId: args.setLoopSessionId,
    deps: args.rebindDeps,
    startSessionWatch: args.startSessionWatch,
  })

  return {
    actionSubsystem,
    pendingEvent,
    deferredRestart,
    preCliffMonitor,
    stopSessionRotatedWatch,
  }
}

export async function settleIterationExit(
  wiring: IterationWiring,
  proc: InheritedProc
): Promise<void> {
  setAgentActionHandler(null)
  wiring.deferredRestart.cancel?.()
  wiring.deferredRestart.cancel = null
  wiring.preCliffMonitor?.stop()

  const { value: observedExit, notice: observedExitNotice } = await LIVE_CHILD_EXIT_RULE.classify({
    status: proc.exitStatus(),
    supervisorKilled: wiring.actionSubsystem.wasSupervisorKill(),
    shuttingDown: isShuttingDown(),
  })
  if (observedExit === null)
    console.log(
      `${LOG} child exit NOT classified — the rule could not be read, so this death is ` +
        `recorded as unexamined rather than guessed: ${observedExitNotice ?? "no reason given"}`
    )
  else setObservedChildExit(observedExit)
}
