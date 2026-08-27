import { describe, expect, it } from "bun:test"
import { type CoherenceRule, CoherenceRulesSchema, evaluateCoherenceRules } from "./coherence-rules"

const RULES: readonly CoherenceRule[] = [
  { kind: "valueIn", key: "pointsSourceKind", allowed: ["windowed", "delta", "manual"] },
  {
    kind: "requires",
    when: { key: "pointsSourceKind", eq: "windowed" },
    require: [["pointsSourceAggregate"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "bytes" },
    require: [["pointsPathPrefix", "pointsPathPrefixes"]],
  },
  {
    kind: "requires",
    when: { key: "pointsSourceAggregate", eq: "sum" },
    require: [["pointsSource"], ["pointsSourcePointField"]],
  },
]

describe("CoherenceRulesSchema", () => {
  it("parses both rule forms", () => {
    expect(CoherenceRulesSchema.parse(RULES)).toEqual(RULES)
  })

  it("rejects an unknown rule kind", () => {
    expect(() => CoherenceRulesSchema.parse([{ kind: "bogus", key: "x" }])).toThrow()
  })

  it("rejects a requires rule with an empty anyOf group", () => {
    expect(() =>
      CoherenceRulesSchema.parse([{ kind: "requires", when: { key: "a", eq: "b" }, require: [[]] }])
    ).toThrow()
  })
})

const EQ_RULE: readonly CoherenceRule[] = [
  {
    kind: "numericEqualityWhenPresent",
    whenPresent: "completedAt",
    left: "progress",
    right: "length",
  },
]

describe("numericEqualityWhenPresent", () => {
  it("parses the rule form", () => {
    expect(CoherenceRulesSchema.parse(EQ_RULE)).toEqual(EQ_RULE)
  })

  it("passes when the gate key is absent (rule dormant)", () => {
    expect(evaluateCoherenceRules(EQ_RULE, { progress: 5, length: 10 })).toEqual([])
  })

  it("passes when gate present and left == right", () => {
    expect(
      evaluateCoherenceRules(EQ_RULE, {
        completedAt: "2026-07-14T00:00:00.000Z",
        progress: 10,
        length: 10,
      })
    ).toEqual([])
  })

  it("passes when gate present and both left and right absent (0 == 0)", () => {
    expect(evaluateCoherenceRules(EQ_RULE, { completedAt: 1_700_000_000_000 })).toEqual([])
  })

  it("coalesces numeric strings for comparison", () => {
    expect(
      evaluateCoherenceRules(EQ_RULE, { completedAt: "x", progress: "10", length: 10 })
    ).toEqual([])
  })

  it("flags gate present with left != right (byte-exact detail)", () => {
    expect(
      evaluateCoherenceRules(EQ_RULE, {
        completedAt: "2026-07-14T00:00:00.000Z",
        progress: 7,
        length: 10,
      })
    ).toEqual(['"completedAt" present requires "progress" == "length"'])
  })

  it("flags gate present with a present left but absent right (7 != 0)", () => {
    expect(
      evaluateCoherenceRules(EQ_RULE, { completedAt: 1_700_000_000_000, progress: 7 })
    ).toEqual(['"completedAt" present requires "progress" == "length"'])
  })

  it("treats a non-numeric string as 0", () => {
    expect(
      evaluateCoherenceRules(EQ_RULE, { completedAt: "z", progress: "abc", length: 0 })
    ).toEqual([])
  })
})

describe("evaluateCoherenceRules — coherent states", () => {
  it("passes a row with none of the governed keys (retired / unconfigured)", () => {
    expect(evaluateCoherenceRules(RULES, { title: "Abby" })).toEqual([])
  })

  it("passes a complete windowed/bytes recipe (single prefix)", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefix: "books/",
      })
    ).toEqual([])
  })

  it("passes a complete windowed/bytes recipe (array prefixes)", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefixes: [".claude/", "packages/agents/"],
      })
    ).toEqual([])
  })

  it("passes a complete windowed/sum recipe", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "sum",
        pointsSource: "session",
        pointsSourcePointField: "lovePoints",
      })
    ).toEqual([])
  })

  it("passes a kind with no conditional requirements", () => {
    expect(evaluateCoherenceRules(RULES, { pointsSourceKind: "delta" })).toEqual([])
  })
})

describe("evaluateCoherenceRules — violations", () => {
  it("flags a valueIn miss with the exact detail shape", () => {
    expect(evaluateCoherenceRules(RULES, { pointsSourceKind: "windwoed" })).toEqual([
      'property "pointsSourceKind" value "windwoed" not in [windowed, delta, manual]',
    ])
  })

  it("flags a non-string valueIn value", () => {
    expect(evaluateCoherenceRules(RULES, { pointsSourceKind: 5 })).toEqual([
      'property "pointsSourceKind" non-string value not in [windowed, delta, manual]',
    ])
  })

  it("flags a missing singleton requirement", () => {
    expect(evaluateCoherenceRules(RULES, { pointsSourceKind: "windowed" })).toEqual([
      'pointsSourceKind="windowed" requires "pointsSourceAggregate"',
    ])
  })

  it("flags a missing anyOf group naming every alternative", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
      })
    ).toEqual([
      'pointsSourceAggregate="bytes" requires one of "pointsPathPrefix", "pointsPathPrefixes"',
    ])
  })

  it("flags each failing allOf group as its own violation, in rule order", () => {
    expect(
      evaluateCoherenceRules(RULES, { pointsSourceKind: "windowed", pointsSourceAggregate: "sum" })
    ).toEqual([
      'pointsSourceAggregate="sum" requires "pointsSource"',
      'pointsSourceAggregate="sum" requires "pointsSourcePointField"',
    ])
  })
})

describe("evaluateCoherenceRules — meaningful presence", () => {
  it("treats the empty string as absent", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefix: "",
      })
    ).toEqual([
      'pointsSourceAggregate="bytes" requires one of "pointsPathPrefix", "pointsPathPrefixes"',
    ])
  })

  it("treats null as absent", () => {
    expect(
      evaluateCoherenceRules(RULES, { pointsSourceKind: "windowed", pointsSourceAggregate: null })
    ).toEqual(['pointsSourceKind="windowed" requires "pointsSourceAggregate"'])
  })

  it("treats an empty array as absent", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefixes: [],
      })
    ).toEqual([
      'pointsSourceAggregate="bytes" requires one of "pointsPathPrefix", "pointsPathPrefixes"',
    ])
  })

  it("treats an array with only empty strings as absent", () => {
    expect(
      evaluateCoherenceRules(RULES, {
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefixes: [""],
      })
    ).toEqual([
      'pointsSourceAggregate="bytes" requires one of "pointsPathPrefix", "pointsPathPrefixes"',
    ])
  })

  it("an absent valueIn key is coherent — valueIn applies only if present", () => {
    expect(evaluateCoherenceRules(RULES, { unrelated: "x" })).toEqual([])
  })
})
