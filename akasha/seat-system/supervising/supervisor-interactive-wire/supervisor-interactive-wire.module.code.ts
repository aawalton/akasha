import { buildAgentActionSubsystem } from "@akasha/seat-system/supervisor-agent-action"
import {
  clearRequestedAction,
  consumeThenProxySwap,
} from "@akasha/seat-system/supervisor-agent-action-clear"
import type { PendingAgentAction } from "@akasha/seat-system/supervisor-agent-action-types"
import { liveChildExitRule } from "@akasha/seat-system/supervisor-child-exit-rule"
import { wireSessionRotatedWatcher } from "@akasha/seat-system/supervisor-clear-rebind-wire"
import { LOG } from "@akasha/seat-system/supervisor-config"
import type { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import { liveDeferredRestartRule } from "@akasha/seat-system/supervisor-deferred-restart-rule"
import { askPreCliffRestart } from "@akasha/seat-system/supervisor-precliff-restart-rule"
import { triggerProxySwap } from "@akasha/seat-system/supervisor-proxy-version"
import type { ClearRebindHooks } from "@akasha/seat-system/supervisor-rebind"
import type { ClearRebindDeps } from "@akasha/seat-system/supervisor-rebind-deps"
import type { AgentIdHandle } from "@akasha/seat-system/supervisor-self-identity"
import {
  isShuttingDown,
  setAgentActionHandler,
  setObservedChildExit,
} from "@akasha/seat-system/supervisor-state"
import type { AgentProcess, InheritedProc } from "@akasha/seat-system/supervisor-types"
import { startPreCliffRestartMonitor } from "@tools/lib/supervisor-precliff-restart"
import { liveIdleRule } from "../supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
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
    idleRule: liveIdleRule,
    deferredRestartRule: liveDeferredRestartRule,
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

  const { value: cliffConstants, notice: cliffNotice } = await liveDeferredRestartRule.constants()
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

  const { value: observedExit, notice: observedExitNotice } = await liveChildExitRule.classify({
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
