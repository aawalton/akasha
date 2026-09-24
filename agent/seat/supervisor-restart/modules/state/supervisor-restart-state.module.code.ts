import { armDeferredRestart } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import type { DeferredRestartRuleSource } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"
import { LIVE_IDLE_RULE } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { isProcessAlive } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-exec/supervisor-exec.module.code.ts"
import { getInheritedClaude } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import {
  defaultRunInstall,
  type RestartRunInstall,
} from "akasha/agent/seat/supervisor-restart/modules/install/supervisor-restart-install.module.code.ts"
import type { RestartJitterRuleSource } from "akasha/agent/seat/supervisor-restart/modules/jitter-rule/supervisor-restart-jitter-rule.module.code.ts"
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

function refuseUnwiredRestartRule(which: string): never {
  throw new Error(
    `supervisor-restart-state: the ${which} was reached before \`setSelfHealIdleProbe\` wired one. ` +
      "Either this path should not be deciding, or the composition root has not run — a " +
      "supervisor that guessed a re-exec window here would act on the fleet with confidence " +
      "it had not earned."
  )
}

const UNWIRED_DEFERRED_RESTART_RULE: DeferredRestartRuleSource = {
  constants: () => refuseUnwiredRestartRule("deferred-restart rule"),
  decide: () => refuseUnwiredRestartRule("deferred-restart rule"),
  windows: () => refuseUnwiredRestartRule("deferred-restart rule"),
}

export type ArmReExecGate = (opts: { onIdle: () => void; maxDeferMs: number }) => {
  cancel: () => void
}

const defaultArmReExecGate: ArmReExecGate = (opts) =>
  armDeferredRestart({
    getClaudePid: SUPERVISOR_RESTART_STATE.getClaudePidForSelfHeal,
    getProxyPort: SUPERVISOR_RESTART_STATE.getProxyPortForSelfHeal,
    getAgentId: () => SUPERVISOR_RESTART_STATE.currentAgentIdForSelfHeal,
    onIdle: opts.onIdle,
    idleRule: LIVE_IDLE_RULE,
    deferredRestartRule: SUPERVISOR_RESTART_STATE.deferredRestartRuleForSelfHeal,
    maxDeferMs: opts.maxDeferMs,
    log: (line) => console.log(`${LOG} Self-heal ${line}`),
  })

const defaultScheduleReExec: (cb: () => void, delayMs: number) => void = (cb, delayMs) => {
  setTimeout(cb, delayMs)
}

export const SUPERVISOR_RESTART_STATE: {
  pendingReExec: boolean
  reExecScheduled: boolean
  installInFlight: boolean
  initialSupervisorVersion: string | null
  currentAgentIdForSelfHeal: string | null
  currentSessionIdForSelfHeal: string | null
  proxyOwnerAgentIdForSelfHeal: string | null
  getClaudePidForSelfHeal: () => number | null
  getProxyPortForSelfHeal: () => number | null
  deferredReExecGate: { cancel: () => void } | null
  selfHealJitterRuleForSelfHeal: RestartJitterRuleSource
  deferredRestartRuleForSelfHeal: DeferredRestartRuleSource
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
  currentAgentIdForSelfHeal: null,
  currentSessionIdForSelfHeal: null,
  proxyOwnerAgentIdForSelfHeal: null,
  getClaudePidForSelfHeal: inheritedClaudePid,
  getProxyPortForSelfHeal: () => null,
  deferredReExecGate: null,
  selfHealJitterRuleForSelfHeal: () => refuseUnwiredRestartRule("self-heal jitter rule"),
  deferredRestartRuleForSelfHeal: UNWIRED_DEFERRED_RESTART_RULE,
  armReExecGate: defaultArmReExecGate,
  killSelf: (sig) => process.kill(process.pid, sig),
  scheduleReExec: defaultScheduleReExec,
  randomFloat: Math.random,
  runInstall: defaultRunInstall,
}

export function isPendingReExec(): boolean {
  return (
    SUPERVISOR_RESTART_STATE.pendingReExec ||
    reExecAsked(SUPERVISOR_RESTART_STATE.currentAgentIdForSelfHeal)
  )
}

export function setCurrentAgentIdForRestart(agentId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.currentAgentIdForSelfHeal = agentId
  takeReExecAsk(agentId)
}

export function getCurrentAgentIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.currentAgentIdForSelfHeal
}

export function setCurrentSessionIdForRestart(sessionId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.currentSessionIdForSelfHeal = sessionId
}

export function getCurrentSessionIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.currentSessionIdForSelfHeal
}

export function setGatewayOwnerAgentIdForRestart(agentId: string | null): undefined {
  SUPERVISOR_RESTART_STATE.proxyOwnerAgentIdForSelfHeal = agentId
}

export function getGatewayOwnerAgentIdForRestart(): string | null {
  return SUPERVISOR_RESTART_STATE.proxyOwnerAgentIdForSelfHeal
}

export function setRestartIdleProbe(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  selfHealJitterRule: RestartJitterRuleSource
  deferredRestartRule: DeferredRestartRuleSource
}): undefined {
  SUPERVISOR_RESTART_STATE.getClaudePidForSelfHeal = opts.getClaudePid
  SUPERVISOR_RESTART_STATE.getProxyPortForSelfHeal = opts.getProxyPort
  SUPERVISOR_RESTART_STATE.selfHealJitterRuleForSelfHeal = opts.selfHealJitterRule
  SUPERVISOR_RESTART_STATE.deferredRestartRuleForSelfHeal = opts.deferredRestartRule
}
