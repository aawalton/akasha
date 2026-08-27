import { describe, expect, test } from "bun:test"
import {
  decideLiveRulesDrift,
  type LiveRulesVerdict,
  type PrometheusRuleRef,
  parseCommittedRules,
  refLabel,
} from "./decide-live-rules-drift"
import { ALERT_RULES } from "./synth-alerts"

function ref(group: string, type: PrometheusRuleRef["type"], name: string): PrometheusRuleRef {
  return { group, type, name }
}

const TARGET_DOWN = ref("cluster-alerts", "alerting", "TargetDown")
const POD_PENDING = ref("cluster-alerts", "alerting", "PodPending")
const CEILING = ref("query-performance", "alerting", "QueryHardCeilingExceeded")
const MEM_TOTAL = ref("macos-memory-normalization", "recording", "node_memory_MemTotal_bytes")

const AT = 1_700_000_000_000

function expectPass(verdict: LiveRulesVerdict) {
  if (verdict.kind !== "pass") throw new Error(`expected a pass verdict, got ${verdict.kind}`)
  return verdict
}

function expectFail(verdict: LiveRulesVerdict) {
  if (verdict.kind !== "fail") throw new Error(`expected a fail verdict, got ${verdict.kind}`)
  return verdict
}

function expectNothingCommitted(verdict: LiveRulesVerdict) {
  const fail = expectFail(verdict)
  if (fail.coverage.declared !== 0)
    throw new Error(`expected an empty committed set, got ${String(fail.coverage.declared)}`)
  return fail
}

describe("decideLiveRulesDrift verdicts (#16335)", () => {
  test("the same rules in a different order on each side are a pass", () => {
    const verdict = expectPass(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, MEM_TOTAL, CEILING],
        live: [CEILING, TARGET_DOWN, MEM_TOTAL],
        observedAtMs: AT,
      })
    )
    expect(verdict.coverage.observed).toBe(3)
  })

  test("a committed rule the process never loaded comes back as missing", () => {
    const verdict = expectFail(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, POD_PENDING],
        live: [TARGET_DOWN],
        observedAtMs: AT,
      })
    )
    expect(verdict.evidence.missing).toEqual([POD_PENDING])
    expect(verdict.evidence.unexpected).toEqual([])
    expect(verdict.evidence.committedCount).toBe(2)
    expect(verdict.evidence.liveCount).toBe(1)
  })

  test("a live rule absent from the repo comes back as unexpected, not a warning", () => {
    const verdict = expectFail(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN],
        live: [TARGET_DOWN, POD_PENDING],
        observedAtMs: AT,
      })
    )
    expect(verdict.evidence.missing).toEqual([])
    expect(verdict.evidence.unexpected).toEqual([POD_PENDING])
    expect(verdict.evidence.committedCount).toBe(1)
    expect(verdict.evidence.liveCount).toBe(2)
  })

  test("both directions are reported together", () => {
    const verdict = expectFail(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, POD_PENDING],
        live: [TARGET_DOWN, CEILING],
        observedAtMs: AT,
      })
    )
    expect(verdict.evidence.missing).toEqual([POD_PENDING])
    expect(verdict.evidence.unexpected).toEqual([CEILING])
  })

  test("a fail names each drifted rule in findings, each with a non-null at", () => {
    const verdict = expectFail(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, POD_PENDING],
        live: [TARGET_DOWN, CEILING],
        observedAtMs: AT,
      })
    )
    expect(verdict.findings).toEqual([
      { detail: "committed, not live", at: refLabel(POD_PENDING) },
      { detail: "live, not committed", at: refLabel(CEILING) },
    ])
    for (const finding of verdict.findings) {
      expect(finding.at).not.toBeNull()
    }
  })

  test("an empty committed set fails, never passes over the nothing it measured", () => {
    const verdict = expectNothingCommitted(
      decideLiveRulesDrift({
        committed: [],
        live: [TARGET_DOWN, POD_PENDING],
        observedAtMs: AT,
      })
    )
    expect(verdict.reason).toContain("committed")
    expect(verdict.findings).not.toBeEmpty()
  })

  test("an empty live set against committed rules is a loud fail, not unknown and not a pass", () => {
    const verdict = decideLiveRulesDrift({
      committed: [TARGET_DOWN, MEM_TOTAL],
      live: [],
      observedAtMs: AT,
    })
    expect(verdict.kind).not.toBe("pass")
    const fail = expectFail(verdict)
    expect(fail.coverage.declared).toBe(2)
    expect(fail.evidence.missing).toEqual([TARGET_DOWN, MEM_TOTAL])
    expect(fail.evidence.unexpected).toEqual([])
    expect(fail.evidence.committedCount).toBe(2)
    expect(fail.evidence.liveCount).toBe(0)
  })

  test("both sides empty fails on the committed side — its emptiness dominates", () => {
    expect(
      expectNothingCommitted(decideLiveRulesDrift({ committed: [], live: [], observedAtMs: AT }))
        .reason
    ).toContain("committed")
  })

  test("the same rule name in two groups is two distinct rules", () => {
    const inCluster = ref("cluster-alerts", "alerting", "Watchdog")
    const inInfra = ref("cert-and-storage-liveness", "alerting", "Watchdog")
    const verdict = expectFail(
      decideLiveRulesDrift({ committed: [inCluster], live: [inInfra], observedAtMs: AT })
    )
    expect(verdict.evidence.missing).toEqual([inCluster])
    expect(verdict.evidence.unexpected).toEqual([inInfra])
  })

  test("the same name at two rule types is two distinct rules", () => {
    const alerting = ref("query-performance", "alerting", "query_tail_seconds")
    const recording = ref("query-performance", "recording", "query_tail_seconds")
    const verdict = expectFail(
      decideLiveRulesDrift({ committed: [alerting], live: [recording], observedAtMs: AT })
    )
    expect(verdict.evidence.missing).toEqual([alerting])
    expect(verdict.evidence.unexpected).toEqual([recording])
  })

  test("duplicate triples collapse and manufacture no phantom diff", () => {
    const verdict = expectPass(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, TARGET_DOWN, POD_PENDING],
        live: [POD_PENDING, TARGET_DOWN, POD_PENDING, POD_PENDING],
        observedAtMs: AT,
      })
    )
    expect(verdict.coverage.observed).toBe(2)
  })

  test("duplicates on one side do not inflate its reported count", () => {
    const verdict = expectFail(
      decideLiveRulesDrift({
        committed: [TARGET_DOWN, TARGET_DOWN],
        live: [POD_PENDING],
        observedAtMs: AT,
      })
    )
    expect(verdict.evidence.committedCount).toBe(1)
    expect(verdict.evidence.liveCount).toBe(1)
    expect(verdict.evidence.missing).toEqual([TARGET_DOWN])
    expect(verdict.evidence.unexpected).toEqual([POD_PENDING])
  })

  test("missing and unexpected are sorted by group, then type, then name", () => {
    const committed = [
      ref("zulu", "alerting", "B"),
      ref("alpha", "recording", "b"),
      ref("alpha", "alerting", "B"),
      ref("alpha", "alerting", "A"),
      ref("alpha", "recording", "a"),
      ref("zulu", "alerting", "A"),
    ]
    const missing = expectFail(decideLiveRulesDrift({ committed, live: [], observedAtMs: AT }))
    expect(missing.evidence.missing).toEqual([
      ref("alpha", "alerting", "A"),
      ref("alpha", "alerting", "B"),
      ref("alpha", "recording", "a"),
      ref("alpha", "recording", "b"),
      ref("zulu", "alerting", "A"),
      ref("zulu", "alerting", "B"),
    ])
    const unexpected = expectFail(
      decideLiveRulesDrift({ committed: [TARGET_DOWN], live: committed, observedAtMs: AT })
    )
    expect(unexpected.evidence.unexpected.map((r) => `${r.group}/${r.type}/${r.name}`)).toEqual([
      "alpha/alerting/A",
      "alpha/alerting/B",
      "alpha/recording/a",
      "alpha/recording/b",
      "zulu/alerting/A",
      "zulu/alerting/B",
    ])
  })
})

const SCENARIOS: readonly {
  readonly committed: readonly PrometheusRuleRef[]
  readonly live: readonly PrometheusRuleRef[]
}[] = [
  { committed: [TARGET_DOWN, MEM_TOTAL], live: [MEM_TOTAL, TARGET_DOWN] },
  { committed: [TARGET_DOWN, POD_PENDING], live: [TARGET_DOWN] },
  { committed: [TARGET_DOWN], live: [TARGET_DOWN, CEILING] },
  { committed: [TARGET_DOWN, POD_PENDING], live: [CEILING, MEM_TOTAL] },
  { committed: [TARGET_DOWN, TARGET_DOWN, POD_PENDING], live: [POD_PENDING, POD_PENDING] },
  { committed: [TARGET_DOWN, MEM_TOTAL], live: [] },
]

describe("decideLiveRulesDrift aggregate derivation (#16335)", () => {
  test("the reported counts and the reported lists agree on the overlap", () => {
    for (const scenario of SCENARIOS) {
      const verdict = decideLiveRulesDrift({ ...scenario, observedAtMs: AT })
      if (verdict.kind !== "fail") continue
      expect(verdict.evidence.committedCount - verdict.evidence.missing.length).toBe(
        verdict.evidence.liveCount - verdict.evidence.unexpected.length
      )
      expect(verdict.evidence.missing.length).toBeLessThanOrEqual(verdict.evidence.committedCount)
      expect(verdict.evidence.unexpected.length).toBeLessThanOrEqual(verdict.evidence.liveCount)
    }
  })

  test("pass implies both sides hold the same number of distinct rules", () => {
    for (const scenario of SCENARIOS) {
      const verdict = decideLiveRulesDrift({ ...scenario, observedAtMs: AT })
      if (verdict.kind !== "pass") continue
      const swapped = expectFail(
        decideLiveRulesDrift({
          committed: scenario.committed,
          live: [...scenario.live, CEILING],
          observedAtMs: AT,
        })
      )
      expect(swapped.evidence.committedCount).toBe(verdict.coverage.observed)
      expect(swapped.evidence.liveCount).toBe(verdict.coverage.observed + 1)
    }
  })

  test("swapping the two sides swaps missing and unexpected, and preserves pass", () => {
    for (const scenario of SCENARIOS) {
      const forward = decideLiveRulesDrift({ ...scenario, observedAtMs: AT })
      if (forward.coverage.declared === 0) continue
      const backward = decideLiveRulesDrift({
        committed: scenario.live,
        live: scenario.committed,
        observedAtMs: AT,
      })
      if (forward.kind === "pass") {
        expect(expectPass(backward).coverage.observed).toBe(forward.coverage.observed)
        continue
      }
      if (backward.coverage.declared === 0) {
        expect(forward.evidence.liveCount).toBe(0)
        continue
      }
      const reverse = expectFail(backward)
      expect(reverse.evidence.missing).toEqual(forward.evidence.unexpected)
      expect(reverse.evidence.unexpected).toEqual(forward.evidence.missing)
      expect(reverse.evidence.committedCount).toBe(forward.evidence.liveCount)
      expect(reverse.evidence.liveCount).toBe(forward.evidence.committedCount)
    }
  })
})

const FIXTURE_YML = `groups:
  - name: macos-memory-normalization
    rules:
      - record: node_memory_MemTotal_bytes
        expr: node_memory_total_bytes
  - name: cluster-alerts
    rules:
      - alert: TargetDown
        expr: up == 0
        for: 10m
        labels:
          severity: warning
`

describe("parseCommittedRules (#16335)", () => {
  test("reads alert rules as alerting and record rules as recording", () => {
    expect(parseCommittedRules(FIXTURE_YML)).toEqual([
      ref("macos-memory-normalization", "recording", "node_memory_MemTotal_bytes"),
      ref("cluster-alerts", "alerting", "TargetDown"),
    ])
  })

  test("throws on unparseable YAML rather than returning an empty set", () => {
    expect(() => parseCommittedRules("groups: [unclosed")).toThrow()
  })

  test("throws when the document is not a groups mapping", () => {
    expect(() => parseCommittedRules("just a string")).toThrow()
  })

  test("throws when a rule declares neither alert nor record", () => {
    expect(() =>
      parseCommittedRules("groups:\n  - name: g\n    rules:\n      - expr: up == 0\n")
    ).toThrow()
  })

  test("the real composed ALERT_RULES parses to a fully-populated rule set", () => {
    const rules = parseCommittedRules(ALERT_RULES)
    expect(rules.length).toBeGreaterThan(0)
    expect(rules.length).toBeGreaterThan(44)
    for (const rule of rules) {
      expect(rule.group.length).toBeGreaterThan(0)
      expect(rule.name.length).toBeGreaterThan(0)
    }
  })

  test("known committed rules are present with their real group and type", () => {
    const rules = parseCommittedRules(ALERT_RULES)
    expect(rules).toContainEqual(ref("cluster-alerts", "alerting", "TargetDown"))
    expect(rules).toContainEqual(ref("cluster-alerts", "alerting", "PodCrashLooping"))
    expect(rules).toContainEqual(
      ref("macos-memory-normalization", "recording", "node_memory_MemTotal_bytes")
    )
  })

  test("the real ALERT_RULES compared against itself is a pass", () => {
    const rules = parseCommittedRules(ALERT_RULES)
    const verdict = expectPass(
      decideLiveRulesDrift({ committed: rules, live: [...rules].reverse(), observedAtMs: AT })
    )
    expect(verdict.coverage.observed).toBe(rules.length)
  })
})
