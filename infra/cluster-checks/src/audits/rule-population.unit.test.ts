import { describe, expect, test } from "bun:test"
import { OperationalError } from "@shared/errors-core/exit"
import {
  emptyRules,
  renderRuleReading,
  ruleCertifies,
  ruleReading,
  summarizeRuleCorpus,
} from "../lib/rule-population.ts"
import { assertCanaries, SKIPS_EVERYTHING, WEIGHS_EVERYTHING } from "./rule-population.ts"

const EXAMINED = 12

const bucket = (name: string, offered: number, weighed: number) => ({ name, offered, weighed })

const healthy = [
  bucket(SKIPS_EVERYTHING, EXAMINED, 0),
  bucket(WEIGHS_EVERYTHING, EXAMINED, EXAMINED),
]

describe("assertCanaries", () => {
  test("a dispatch that counted correctly passes", () => {
    expect(() => assertCanaries({ buckets: healthy, examined: EXAMINED })).not.toThrow()
  })

  test("refuses when the skip is not counted, so no empty rule could be found", () => {
    const buckets = [
      bucket(SKIPS_EVERYTHING, EXAMINED, EXAMINED),
      bucket(WEIGHS_EVERYTHING, EXAMINED, EXAMINED),
    ]
    expect(() => assertCanaries({ buckets, examined: EXAMINED })).toThrow(OperationalError)
  })

  test("refuses when the count runs under the corpus, so a live rule could read as empty", () => {
    const buckets = [bucket(SKIPS_EVERYTHING, EXAMINED, 0), bucket(WEIGHS_EVERYTHING, EXAMINED, 3)]
    expect(() => assertCanaries({ buckets, examined: EXAMINED })).toThrow(OperationalError)
  })

  test("refuses when the dispatch did not reach every rule", () => {
    const buckets = [bucket(SKIPS_EVERYTHING, 4, 0), bucket(WEIGHS_EVERYTHING, EXAMINED, EXAMINED)]
    expect(() => assertCanaries({ buckets, examined: EXAMINED })).toThrow(OperationalError)
  })

  test("refuses when a control never ran at all", () => {
    expect(() => assertCanaries({ buckets: [], examined: EXAMINED })).toThrow(OperationalError)
  })

  test("neither control alone would catch both failures", () => {
    const stuckAtZero = [
      bucket(SKIPS_EVERYTHING, EXAMINED, 0),
      bucket(WEIGHS_EVERYTHING, EXAMINED, 0),
    ]
    const stuckAtTotal = [
      bucket(SKIPS_EVERYTHING, EXAMINED, EXAMINED),
      bucket(WEIGHS_EVERYTHING, EXAMINED, EXAMINED),
    ]
    expect(() => assertCanaries({ buckets: stuckAtZero, examined: EXAMINED })).toThrow()
    expect(() => assertCanaries({ buckets: stuckAtTotal, examined: EXAMINED })).toThrow()
  })
})

const scanner = (rule: string, scanned: number, compared: number, findings: number) =>
  ruleReading({
    rule,
    kind: "syntax-scanner",
    source: "infra/cluster-checks/src/lib/scanner-registry.ts",
    scanned,
    compared,
    findings,
  })

describe("a rule's population", () => {
  test("a rule that weighed a corpus and found nothing certifies; one that weighed none does not", () => {
    expect(ruleCertifies(scanner("live", 100, 100, 0))).toBe(true)
    expect(ruleCertifies(scanner("blind", 100, 0, 0))).toBe(false)
  })

  test("a rule offered nothing at all certifies nothing", () => {
    expect(ruleCertifies(scanner("unreached", 0, 0, 0))).toBe(false)
  })

  test("findings do not rescue a rule that weighed nothing", () => {
    expect(ruleCertifies(scanner("contradictory", 10, 0, 3))).toBe(false)
  })

  test("emptyRules names exactly the rules that certified nothing", () => {
    const rules = [scanner("a", 10, 10, 0), scanner("b", 10, 0, 0), scanner("c", 0, 0, 0)]
    expect(emptyRules(rules).map((r) => r.rule)).toEqual(["b", "c"])
  })
})

describe("the corpus reading", () => {
  test("a reading that enumerated no rules reports no-population rather than a clean zero", () => {
    expect(summarizeRuleCorpus([]).kind).toBe("no-population")
  })

  test("the denominator is rules read and the finding count is rules that weighed nothing", () => {
    const reading = summarizeRuleCorpus([
      scanner("a", 10, 10, 0),
      scanner("b", 10, 0, 0),
      scanner("c", 10, 10, 2),
    ])
    expect(reading).toEqual({
      kind: "measured",
      scanned: 3,
      compared: 3,
      findings: 1,
      coverage: "complete",
    })
  })
})

describe("renderRuleReading", () => {
  test("an empty rule's line says so in words rather than as a zero", () => {
    const line = renderRuleReading(scanner("blind", 4321, 0, 0))
    expect(line).toContain("EMPTY POPULATION")
    expect(line).toContain("certifies nothing")
  })

  test("a live rule's line carries both terms of its own ratio", () => {
    const line = renderRuleReading(scanner("live", 100, 60, 2))
    expect(line).toContain("weighed=60 of 100")
    expect(line).not.toContain("EMPTY POPULATION")
  })
})
