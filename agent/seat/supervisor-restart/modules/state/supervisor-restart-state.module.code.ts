import { armDeferredRestart } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart/supervisor-deferred-restart.module.code.ts"
import type { DeferredRestartRuleSource } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"
import { LIVE_IDLE_RULE } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { isProcessAlive } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-exec/supervisor-exec.module.code.ts"
import { getInheritedClaude } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import {
  defaultRunInstall,
  type SelfHealRunInstall,
} from "akasha/agent/seat/supervisor-restart/modules/install/supervisor-restart-install.module.code.ts"
import type { SelfHealJitterRuleSource } from "akasha/agent/seat/supervisor-restart/modules/jitter-rule/supervisor-restart-jitter-rule.module.code.ts"
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

function refuseUnwiredSelfHealRule(which: string): never {
  throw new Error(
    `supervisor-restart-state: the ${which} was reached before \`setSelfHealIdleProbe\` wired one. ` +
      "Either this path should not be deciding, or the composition root has not run — a " +
      "supervisor that guessed a re-exec window here would act on the fleet with confidence " +
      "it had not earned."
  )
}

const UNWIRED_DEFERRED_RESTART_RULE: DeferredRestartRuleSource = {
  constants: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
  decide: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
  windows: () => refuseUnwiredSelfHealRule("deferred-restart rule"),
}

export type ArmReExecGate = (opts: { onIdle: () => void; maxDeferMs: number }) => {
  cancel: () => void
}

const defaultArmReExecGate: ArmReExecGate = (opts) =>
  armDeferredRestart({
    getClaudePid: SELF_HEAL_STATE.getClaudePidForSelfHeal,
    getProxyPort: SELF_HEAL_STATE.getProxyPortForSelfHeal,
    getAgentId: () => SELF_HEAL_STATE.currentAgentIdForSelfHeal,
    onIdle: opts.onIdle,
    idleRule: LIVE_IDLE_RULE,
    deferredRestartRule: SELF_HEAL_STATE.deferredRestartRuleForSelfHeal,
    maxDeferMs: opts.maxDeferMs,
    log: (line) => console.log(`${LOG} Self-heal ${line}`),
  })

const defaultScheduleReExec: (cb: () => void, delayMs: number) => void = (cb, delayMs) => {
  setTimeout(cb, delayMs)
}

export const SELF_HEAL_STATE: {
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
  selfHealJitterRuleForSelfHeal: SelfHealJitterRuleSource
  deferredRestartRuleForSelfHeal: DeferredRestartRuleSource
  armReExecGate: ArmReExecGate
  killSelf: (signal: NodeJS.Signals) => boolean
  scheduleReExec: (cb: () => void, delayMs: number) => void
  randomFloat: () => number
  runInstall: SelfHealRunInstall
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
  selfHealJitterRuleForSelfHeal: () => refuseUnwiredSelfHealRule("self-heal jitter rule"),
  deferredRestartRuleForSelfHeal: UNWIRED_DEFERRED_RESTART_RULE,
  armReExecGate: defaultArmReExecGate,
  killSelf: (sig) => process.kill(process.pid, sig),
  scheduleReExec: defaultScheduleReExec,
  randomFloat: Math.random,
  runInstall: defaultRunInstall,
}

export function isPendingReExec(): boolean {
  return SELF_HEAL_STATE.pendingReExec || reExecAsked(SELF_HEAL_STATE.currentAgentIdForSelfHeal)
}

export function setCurrentAgentIdForSelfHeal(agentId: string | null): undefined {
  SELF_HEAL_STATE.currentAgentIdForSelfHeal = agentId
  takeReExecAsk(agentId)
}

export function getCurrentAgentIdForSelfHeal(): string | null {
  return SELF_HEAL_STATE.currentAgentIdForSelfHeal
}

export function setCurrentSessionIdForSelfHeal(sessionId: string | null): undefined {
  SELF_HEAL_STATE.currentSessionIdForSelfHeal = sessionId
}

export function getCurrentSessionIdForSelfHeal(): string | null {
  return SELF_HEAL_STATE.currentSessionIdForSelfHeal
}

export function setProxyOwnerAgentIdForSelfHeal(agentId: string | null): undefined {
  SELF_HEAL_STATE.proxyOwnerAgentIdForSelfHeal = agentId
}

export function getProxyOwnerAgentIdForSelfHeal(): string | null {
  return SELF_HEAL_STATE.proxyOwnerAgentIdForSelfHeal
}

export function setSelfHealIdleProbe(opts: {
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  selfHealJitterRule: SelfHealJitterRuleSource
  deferredRestartRule: DeferredRestartRuleSource
}): undefined {
  SELF_HEAL_STATE.getClaudePidForSelfHeal = opts.getClaudePid
  SELF_HEAL_STATE.getProxyPortForSelfHeal = opts.getProxyPort
  SELF_HEAL_STATE.selfHealJitterRuleForSelfHeal = opts.selfHealJitterRule
  SELF_HEAL_STATE.deferredRestartRuleForSelfHeal = opts.deferredRestartRule
}
