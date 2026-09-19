import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { IdleObservation } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-decide/supervisor-idle-decide.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "idleRule"

export type BusyChildDetail = { pid: string; cmdline: string; ageMs: number | null }

export type IdleVerdict = { readonly idle: boolean; readonly reason: string }

const IgnoredZ = SHAPE.object({
  [RULE]: SHAPE.object({ ignoredMcpCmdlines: SHAPE.array(SHAPE.boolean()) }),
})

const PreservingZ = SHAPE.object({
  [RULE]: SHAPE.object({ preservingRestart: SHAPE.boolean(), busyReason: SHAPE.string() }),
})

const PastCliffZ = SHAPE.object({
  [RULE]: SHAPE.object({ preservingRestartPastCliff: SHAPE.boolean(), busyReason: SHAPE.string() }),
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
