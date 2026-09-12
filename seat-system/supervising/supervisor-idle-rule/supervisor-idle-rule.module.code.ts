import type { IdleObservation } from "akasha/agents/seats/supervisors/modules/idle-decide/supervisor-idle-decide.module.code.ts"
import {
  askRule,
  type RuleAnswer,
} from "akasha/seat-system/supervising/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/seat-system/supervising/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const RULE = "idleRule"

export type BusyChildDetail = { pid: string; cmdline: string; ageMs: number | null }

export type IdleVerdict = { readonly idle: boolean; readonly reason: string }

const IgnoredZ = shape.object({
  [RULE]: shape.object({ ignoredMcpCmdlines: shape.array(shape.boolean()) }),
})

const PreservingZ = shape.object({
  [RULE]: shape.object({ preservingRestart: shape.boolean(), busyReason: shape.string() }),
})

const PastCliffZ = shape.object({
  [RULE]: shape.object({ preservingRestartPastCliff: shape.boolean(), busyReason: shape.string() }),
})

const UNREACHED_REASON = "rule-unreachable"

const SAFE_VERDICT: IdleVerdict = { idle: false, reason: UNREACHED_REASON }

export type IdleRuleSource = {
  ignoredMcpCmdlines: (cmdlines: readonly string[]) => Promise<RuleAnswer<readonly boolean[]>>
  preservingRestart: (obs: IdleObservation) => Promise<RuleAnswer<IdleVerdict>>
  pastCliff: (obs: IdleObservation) => Promise<RuleAnswer<IdleVerdict>>
}

function readIgnoredMcpCmdlines(answered: unknown): readonly boolean[] {
  return IgnoredZ.parse(answered)[RULE].ignoredMcpCmdlines
}

function readPreservingRestart(answered: unknown): IdleVerdict {
  const held = PreservingZ.parse(answered)[RULE]
  return { idle: held.preservingRestart, reason: held.busyReason }
}

function readPastCliff(answered: unknown): IdleVerdict {
  const held = PastCliffZ.parse(answered)[RULE]
  return { idle: held.preservingRestartPastCliff, reason: held.busyReason }
}

function askIgnoredMcpCmdlines(
  cmdlines: readonly string[],
  ask?: AskDecide
): Promise<RuleAnswer<readonly boolean[]>> {
  return askRule(
    RULE,
    { ignoredMcpCmdlines: cmdlines },
    readIgnoredMcpCmdlines,
    cmdlines.map(() => false),
    ask
  )
}

function askPreservingRestart(
  obs: IdleObservation,
  ask?: AskDecide
): Promise<RuleAnswer<IdleVerdict>> {
  return askRule(
    RULE,
    { preservingRestart: obs, busyReason: { obs } },
    readPreservingRestart,
    SAFE_VERDICT,
    ask
  )
}

function askPastCliff(obs: IdleObservation, ask?: AskDecide): Promise<RuleAnswer<IdleVerdict>> {
  return askRule(
    RULE,
    { preservingRestartPastCliff: obs, busyReason: { obs, ignoreBusyChildren: true } },
    readPastCliff,
    SAFE_VERDICT,
    ask
  )
}

export const LIVE_IDLE_RULE: IdleRuleSource = {
  ignoredMcpCmdlines: (cmdlines) => askIgnoredMcpCmdlines(cmdlines),
  preservingRestart: (obs) => askPreservingRestart(obs),
  pastCliff: (obs) => askPastCliff(obs),
}
