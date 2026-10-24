import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { armDeferredRestart } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import {
  REFUSAL_SAID,
  type RegretCut,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-cut/regret-cut.module.code.ts"
import {
  holdReplies,
  regretFor,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-taking/regret-taking.module.code.ts"
import { buildIdleGateArm } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-arm/supervisor-agent-action-arm.module.code.ts"
import {
  clearBeforeSigterm,
  clearRequestedAction,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type {
  AgentActionEvent,
  AgentActionSubsystem,
  PendingAgentAction,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"

export function buildAgentActionSubsystem(opts: {
  killProc: () => void
  getClaudePid: () => number
  getAgentId: () => string | null
  getProxyPort: () => number
  log: (line: string) => void
  onProxySwap: () => Promise<void>
  armDeferred?: typeof armDeferredRestart
  clearAction?: (agentId: string) => Promise<void>
  regretOf?: (agentId: string, messageId: string) => RegretCut
}): AgentActionSubsystem {
  const { killProc, getAgentId, log, onProxySwap } = opts
  const armDeferred = opts.armDeferred ?? armDeferredRestart
  const clearAction = opts.clearAction ?? clearRequestedAction
  const regretOf = opts.regretOf ?? regretFor
  let supervisorKilledProc = false
  let gatewaySwapInFlight = false
  let regretting = false
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
    log,
  })

  const handleAgentAction = async (event: AgentActionEvent): Promise<undefined> => {
    if (event.action === "swap-gateway") {
      if (gatewaySwapInFlight) return
      gatewaySwapInFlight = true
      log(
        `Received swap-gateway for agent ${getAgentId()} — consuming the request then swapping the gateway`
      )
      void onProxySwap().finally(() => {
        gatewaySwapInFlight = false
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
    if (event.action === "regret") {
      await regretNow(event.messageId)
      return
    }
    pendingEvent.value = { event, maintenance: false }
    supervisorKilledProc = true
    log(`Received ${event.action} for agent ${getAgentId()} — SIGTERM`)
    sigterm()
  }

  const regretNow = async (messageId: string): Promise<undefined> => {
    if (regretting) return
    const agentId = getAgentId()
    if (agentId === null) return
    const found = regretOf(agentId, messageId)
    if ("refused" in found) {
      log(`Refused regret of ${messageId} for agent ${agentId}: ${REFUSAL_SAID[found.refused]}`)
      await clearBeforeSigterm(clearAction, agentId)
      return
    }
    regretting = true
    holdReplies(true)
    pendingEvent.value = {
      event: { action: "regret", messageId, cut: found.cut },
      maintenance: false,
    }
    supervisorKilledProc = true
    log(`Received regret of ${messageId} for agent ${agentId} — SIGTERM, then cut at ${found.cut}`)
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
