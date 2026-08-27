import type { Verdict, VerdictFinding } from "@shared/verdict"
import { parse } from "yaml"
import { z } from "zod"

export type PrometheusRuleRef = {
  readonly group: string
  readonly type: "alerting" | "recording"
  readonly name: string
}

export type LiveRulesSubject = "the-live-prometheus-rule-set"

export interface LiveRulesEvidence {
  readonly missing: readonly PrometheusRuleRef[]
  readonly unexpected: readonly PrometheusRuleRef[]
  readonly committedCount: number
  readonly liveCount: number
}

export type LiveRulesVerdict = Verdict<LiveRulesSubject, LiveRulesEvidence>

const SUBJECT: LiveRulesSubject = "the-live-prometheus-rule-set"

export const refLabel = (ref: PrometheusRuleRef): string => `${ref.group}/${ref.type}/${ref.name}`

function refKey(ref: PrometheusRuleRef): string {
  return JSON.stringify([ref.group, ref.type, ref.name])
}

function compareRefs(a: PrometheusRuleRef, b: PrometheusRuleRef): number {
  if (a.group !== b.group) return a.group < b.group ? -1 : 1
  if (a.type !== b.type) return a.type < b.type ? -1 : 1
  if (a.name !== b.name) return a.name < b.name ? -1 : 1
  return 0
}

function distinct(refs: readonly PrometheusRuleRef[]): ReadonlyMap<string, PrometheusRuleRef> {
  return new Map(refs.map((ref) => [refKey(ref), ref]))
}

function absentFrom(
  source: ReadonlyMap<string, PrometheusRuleRef>,
  other: ReadonlyMap<string, PrometheusRuleRef>
): readonly PrometheusRuleRef[] {
  return [...source]
    .filter(([key]) => !other.has(key))
    .map(([, ref]) => ref)
    .sort(compareRefs)
}

export function decideLiveRulesDrift(input: {
  readonly committed: readonly PrometheusRuleRef[]
  readonly live: readonly PrometheusRuleRef[]
  readonly observedAtMs: number
}): LiveRulesVerdict {
  const committed = distinct(input.committed)
  const live = distinct(input.live)
  const observedAtMs = input.observedAtMs

  if (committed.size === 0) {
    return {
      kind: "fail",
      subject: SUBJECT,
      reason:
        "the committed rule set is empty — synthesis produced no rules, so there is nothing to compare the live process against",
      observedAtMs,
      coverage: { observed: 0, declared: 0, unit: "rules" },
      evidence: { missing: [], unexpected: [], committedCount: 0, liveCount: live.size },
      findings: [
        {
          detail: "synthesis produced no committed rules, so nothing was compared",
          at: null,
        },
      ],
    }
  }

  const missing = absentFrom(committed, live)
  const unexpected = absentFrom(live, committed)
  const evidence: LiveRulesEvidence = {
    missing,
    unexpected,
    committedCount: committed.size,
    liveCount: live.size,
  }
  const coverage = { observed: committed.size, declared: committed.size, unit: "rules" }

  const findings: readonly VerdictFinding[] = [
    ...missing.map((ref) => ({ detail: "committed, not live", at: refLabel(ref) })),
    ...unexpected.map((ref) => ({ detail: "live, not committed", at: refLabel(ref) })),
  ]
  const [first, ...rest] = findings
  if (first === undefined) {
    return {
      kind: "pass",
      subject: SUBJECT,
      reason: `serving exactly the committed set`,
      observedAtMs,
      coverage,
      evidence,
    }
  }
  return {
    kind: "fail",
    subject: SUBJECT,
    reason:
      "the live process is not serving the committed alert rules " +
      `(committed ${committed.size}, live ${live.size})`,
    observedAtMs,
    coverage,
    evidence,
    findings: [first, ...rest],
  }
}

const ruleSchema = z.looseObject({
  alert: z.string().optional(),
  record: z.string().optional(),
})
const groupSchema = z.looseObject({ name: z.string(), rules: z.array(ruleSchema) })
const alertsSchema = z.looseObject({ groups: z.array(groupSchema) })

export function parseCommittedRules(alertsYml: string): readonly PrometheusRuleRef[] {
  return alertsSchema.parse(parse(alertsYml)).groups.flatMap((group) =>
    group.rules.map((rule): PrometheusRuleRef => {
      if (rule.alert !== undefined) return { group: group.name, type: "alerting", name: rule.alert }
      if (rule.record !== undefined)
        return { group: group.name, type: "recording", name: rule.record }
      throw new Error(`rule in group "${group.name}" declares neither alert nor record`)
    })
  )
}
