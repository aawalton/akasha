import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { isProcessAlive } from "akasha/agent/seat/supervisor/modules/supervisor-exec/supervisor-exec.module.code.ts"
import { getInheritedClaude } from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import { armDeferredRestart } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import {
  defaultRunInstall,
  type RestartRunInstall,
} from "akasha/agent/seat/supervisor-restart/modules/install/supervisor-restart-install.module.code.ts"
import {
  reExecAsked,
  takeReExecAsk,
} from "akasha/agent/seat/supervisor-restart/modules/supervisor-reexec-mark/supervisor-reexec-mark.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

function inheritedClaudePid(): number | null {
  const inherited = getInheritedClaude()
  if (inherited === null) return null
  return isProcessAlive(inherited.pid) ? inherited.pid : null
}

export const SUPERVISOR_SCRIPT = process.argv[1] ?? ""
export const ORIGINAL_ARGV = process.argv.slice(2)

export type ArmReExecGate = (opts: { onIdle: () => void; maxDeferMs: number }) => {
  cancel: () => void
}

const defaultArmReExecGate: ArmReExecGate = (opts) =>
  armDeferredRestart({
    getClaudePid: SUPERVISOR_RESTART_STATE.getClaudePid,
    getProxyPort: SUPERVISOR_RESTART_STATE.getGatewayPort,
    getAgentId: () => SUPERVISOR_RESTART_STATE.currentAgentId,
    onIdle: opts.onIdle,
    maxDeferMs: opts.maxDeferMs,
    log: (line) => console.log(`${LOG} Supervisor restart ${line}`),
  })

const defaultScheduleReExec: (cb: () => void, delayMs: number) => void = (cb, delayMs) => {
  setTimeout(cb, delayMs)
}

export const SUPERVISOR_RESTART_STATE: {
  pendingReExec: boolean
  reExecScheduled: boolean
  installInFlight: boolean
  initialSupervisorVersion: string | null
  currentAgentId: string | null
  currentSessionId: string | null
  gatewayOwnerAgentId: string | null
  getClaudePid: () => number | null
  getGatewayPort: () => number | null
  deferredReExecGate: { cancel: () => void } | null
  armReExecGate: ArmReExecGate
  killSelf: (signal: NodeJS.Signals) => boolean
  scheduleReExec: (cb: () => void, delayMs: number) => void
  randomFloat: () => number
  runInstall: RestartRunInstall
} = {
  pendingReExec: false,
  reExecScheduled: false,
  installInFlight: false,
  initialSupervisorVersion: null,
  currentAgentId: null,
  currentSessionId: null,
  gatewayOwnerAgentId: null,
  getClaudePid: inheritedClaudePid,
  getGatewayPort: () => null,
  deferredReExecGate: null,
  armReExecGate: defaultArmReExecGate,
  killSelf: (sig) => process.kill(process.pid, sig),
  scheduleReExec: defaultScheduleReExec,
  randomFloat: Math.random,
  runInstall: defaultRunInstall,
}

export function isPendingReExec(): boolean {
  return (
    SUPERVISOR_RESTART_STATE.pendingReExec || reExecAsked(SUPERVISOR_RESTART_STATE.currentAgentId)
  )
}

export function setCurrentAgentIdForRestart(agentId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.currentAgentId = agentId
  takeReExecAsk(agentId)
}

export function getCurrentAgentIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.currentAgentId
}

export function setCurrentSessionIdForRestart(sessionId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.currentSessionId = sessionId
}

export function getCurrentSessionIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.currentSessionId
}

export function setGatewayOwnerAgentIdForRestart(agentId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.gatewayOwnerAgentId = agentId
}

export function getGatewayOwnerAgentIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.gatewayOwnerAgentId
}

export function setRestartIdleProbe(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
}): undefined {
  SUPERVISOR_RESTART_STATE.getClaudePid = opts.getClaudePid
  SUPERVISOR_RESTART_STATE.getGatewayPort = opts.getProxyPort
}
