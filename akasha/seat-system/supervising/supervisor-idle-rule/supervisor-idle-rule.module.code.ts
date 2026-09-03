import { askRule, type RuleAnswer } from "@akasha/seat-system/supervisor-ask-rule"
import { shape } from "@tools/lib/shape"
import type { AskDecide } from "@tools/lib/supervisor-resume-asks"

const RULE = "idleRule"

export type IdleObservation = {
  inFlight: number | null
  busyChildren: number | null
  inFlightDispatchChildren: number | null
  claudePresent: boolean
}

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

export function readIgnoredMcpCmdlines(answered: unknown): readonly boolean[] {
  return IgnoredZ.parse(answered)[RULE].ignoredMcpCmdlines
}

export function readPreservingRestart(answered: unknown): IdleVerdict {
  const held = PreservingZ.parse(answered)[RULE]
  return { idle: held.preservingRestart, reason: held.busyReason }
}

export function readPastCliff(answered: unknown): IdleVerdict {
  const held = PastCliffZ.parse(answered)[RULE]
  return { idle: held.preservingRestartPastCliff, reason: held.busyReason }
}

export function askIgnoredMcpCmdlines(
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

export function askPreservingRestart(
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

export function askPastCliff(
  obs: IdleObservation,
  ask?: AskDecide
): Promise<RuleAnswer<IdleVerdict>> {
  return askRule(
    RULE,
    { preservingRestartPastCliff: obs, busyReason: { obs, ignoreBusyChildren: true } },
    readPastCliff,
    SAFE_VERDICT,
    ask
  )
}

export const liveIdleRule: IdleRuleSource = {
  ignoredMcpCmdlines: (cmdlines) => askIgnoredMcpCmdlines(cmdlines),
  preservingRestart: (obs) => askPreservingRestart(obs),
  pastCliff: (obs) => askPastCliff(obs),
}
