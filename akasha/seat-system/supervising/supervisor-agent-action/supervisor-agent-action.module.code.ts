import { buildIdleGateArm } from "../supervisor-agent-action-arm/supervisor-agent-action-arm.module.code.ts"
import {
  clearBeforeSigterm,
  clearRequestedAction,
} from "../supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type {
  AgentActionEvent,
  AgentActionSubsystem,
  PendingAgentAction,
} from "../supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { LOG } from "../supervisor-config/supervisor-config.module.code.ts"
import { armDeferredRestart } from "../supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import type { DeferredRestartRuleSource } from "../supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"
import type { IdleRuleSource } from "../supervisor-idle-rule/supervisor-idle-rule.module.code.ts"

export function buildAgentActionSubsystem(opts: {
  killProc: () => void
  getClaudePid: () => number
  getAgentId: () => string | null
  getProxyPort: () => number
  log: (line: string) => void
  onProxySwap: () => Promise<void>
  armDeferred?: typeof armDeferredRestart
  idleRule: IdleRuleSource
  deferredRestartRule: DeferredRestartRuleSource
  clearAction?: (agentId: string) => Promise<void>
}): AgentActionSubsystem {
  const { killProc, getAgentId, log, onProxySwap } = opts
  const armDeferred = opts.armDeferred ?? armDeferredRestart
  const clearAction = opts.clearAction ?? clearRequestedAction
  let supervisorKilledProc = false
  let proxySwapInFlight = false
  const pendingEvent: { value: PendingAgentAction | null } = { value: null }
  const deferredRestart: { cancel: (() => void) | null } = { cancel: null }

  const sigterm = (): undefined => {
    try {
      killProc()
    } catch (err) {
      console.error(`${LOG} Failed to SIGTERM Claude CLI:`, err)
    }
  }

  const fireRestartNow = async (
    interruptMessage: string | null,
    maintenance: boolean
  ): Promise<undefined> => {
    pendingEvent.value = {
      event: { action: "restart-now", interruptMessage },
      maintenance,
    }
    supervisorKilledProc = true
    const agentId = getAgentId()
    if (agentId !== null) await clearBeforeSigterm(clearAction, agentId)
    log(`Deferred restart for agent ${agentId} fired (idle) — cleared the request + SIGTERM`)
    sigterm()
  }

  const arm = buildIdleGateArm({
    deferredRestart,
    fire: fireRestartNow,
    armDeferred,
    getClaudePid: opts.getClaudePid,
    getProxyPort: opts.getProxyPort,
    getAgentId,
    idleRule: opts.idleRule,
    deferredRestartRule: opts.deferredRestartRule,
    log,
  })

  const handleAgentAction = async (event: AgentActionEvent): Promise<undefined> => {
    if (event.action === "swap-proxy") {
      if (proxySwapInFlight) return
      proxySwapInFlight = true
      log(
        `Received swap-proxy for agent ${getAgentId()} — consuming the request then swapping proxy`
      )
      void onProxySwap().finally(() => {
        proxySwapInFlight = false
      })
      return
    }
    if (event.action === "restart") {
      if (deferredRestart.cancel !== null || arm.isArming()) return
      log(`Received restart for agent ${getAgentId()} — arming idle gate`)
      await arm.armIdleGate((w) => ({
        interruptMessage: event.interruptMessage,
        maxDeferMs: w.maxDeferMs,
        staleWedgeMs: w.staleWedgeMs,
        armedAtMs: event.restartArmedAt ?? Date.now(),
      }))
      return
    }
    pendingEvent.value = { event, maintenance: false }
    supervisorKilledProc = true
    log(`Received ${event.action} for agent ${getAgentId()} — SIGTERM`)
    sigterm()
  }

  return {
    handleAgentAction,
    pendingEvent,
    deferredRestart,
    wasSupervisorKill: () => supervisorKilledProc,
    armPreCliffRestart: arm.armPreCliffRestart,
  }
}
