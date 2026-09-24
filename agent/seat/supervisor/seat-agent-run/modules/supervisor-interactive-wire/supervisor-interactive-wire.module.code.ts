import { triggerProxySwap } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-version/supervisor-gateway-version.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import type { AgentIdHandle } from "akasha/agent/seat/supervisor/modules/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import {
  isShuttingDown,
  setAgentActionHandler,
  setObservedChildExit,
} from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import type { InheritedProc } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import { EDGE_CONNECTION_CLIFF_PREEMPT_MS } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-decide/supervisor-deferred-restart-decide.module.code.ts"
import { startPreCliffRestartMonitor } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-precliff-restart/supervisor-precliff-restart.module.code.ts"
import { classifyChildExit } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-child-exit-decide/supervisor-child-exit-decide.module.code.ts"
import { buildAgentActionSubsystem } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action/supervisor-agent-action.module.code.ts"
import {
  clearRequestedAction,
  consumeThenProxySwap,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type { PendingAgentAction } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import type { InteractiveSessionBoot } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"

export interface IterationWiring {
  actionSubsystem: ReturnType<typeof buildAgentActionSubsystem>
  pendingEvent: { value: PendingAgentAction | null }
  deferredRestart: { cancel: (() => void) | null }
  preCliffMonitor: { stop: () => void } | null
}

export async function wireIteration(args: {
  agentId: string
  proc: InheritedProc
  agentIdHandle: AgentIdHandle
  proxy: InteractiveSessionBoot["proxy"]
}): Promise<IterationWiring> {
  const { proc, agentIdHandle, proxy } = args
  const actionSubsystem = buildAgentActionSubsystem({
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

  const preCliffMonitor = startPreCliffRestartMonitor({
    getClaudePid: () => proc.pid,
    getAgentId: () => agentIdHandle.id,
    isDeferredArmed: () => deferredRestart.cancel !== null,
    armPreCliff: () => actionSubsystem.armPreCliffRestart(),
    thresholdMs: EDGE_CONNECTION_CLIFF_PREEMPT_MS,
    log: (line) => console.log(`${LOG} ${line}`),
  })

  setAgentActionHandler(handleAgentAction)

  return {
    actionSubsystem,
    pendingEvent,
    deferredRestart,
    preCliffMonitor,
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

  setObservedChildExit(
    classifyChildExit({
      status: proc.exitStatus(),
      supervisorKilled: wiring.actionSubsystem.wasSupervisorKill(),
      shuttingDown: isShuttingDown(),
    })
  )
}
