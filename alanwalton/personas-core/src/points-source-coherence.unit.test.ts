import { describe, expect, it } from "bun:test"
import { CoherenceRulesSchema, evaluateCoherenceRules } from "@shared/pages-core/schema/coherence-rules"
import { PERSONA_POINTS_SOURCE_COHERENCE_RULES } from "./points-source-coherence"

describe("PERSONA_POINTS_SOURCE_COHERENCE_RULES", () => {
  it("is a valid coherence rule set", () => {
    expect(CoherenceRulesSchema.parse(PERSONA_POINTS_SOURCE_COHERENCE_RULES)).toEqual([
      ...PERSONA_POINTS_SOURCE_COHERENCE_RULES,
    ])
  })

  const pass = (attributes: Readonly<Record<string, unknown>>) =>
    evaluateCoherenceRules(PERSONA_POINTS_SOURCE_COHERENCE_RULES, attributes)

  it("accepts every declared-complete kind", () => {
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefix: "books/",
      })
    ).toEqual([])
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "bytes",
        pointsPathPrefixes: [".claude/"],
      })
    ).toEqual([])
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "sum",
        pointsSource: "session",
        pointsSourcePointField: "lovePoints",
      })
    ).toEqual([])
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "count",
        pointsSource: "review-session",
      })
    ).toEqual([])
    expect(pass({ pointsSourceKind: "delta" })).toEqual([])
    expect(pass({ pointsSourceKind: "external" })).toEqual([])
    expect(pass({ pointsSourceKind: "manual" })).toEqual([])
    expect(pass({ pointsSourceKind: "direct" })).toEqual([])
    expect(pass({ pointsSourceKind: "seed" })).toEqual([])
  })

  it("accepts the no-recipe end-state (unconfigured or retired)", () => {
    expect(pass({})).toEqual([])
    expect(pass({ pointsPathPrefix: "books/" })).toEqual([])
  })

  it("rejects the pipeline-20505 class: windowed without aggregate", () => {
    expect(pass({ pointsSourceKind: "windowed" })).toEqual([
      'pointsSourceKind="windowed" requires "pointsSourceAggregate"',
    ])
  })

  it("rejects an unknown pointsSourceKind (the bogus-enum hole)", () => {
    const violations = pass({ pointsSourceKind: "windwoed" })
    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain("pointsSourceKind")
    expect(violations[0]).toContain("windwoed")
  })

  it("admits the unavailable kind, for a points source whose documented source does not exist", () => {
    expect(pass({ pointsSourceKind: "unavailable" })).toEqual([])
  })

  it("rejects an unknown pointsSourceAggregate", () => {
    const violations = pass({ pointsSourceKind: "windowed", pointsSourceAggregate: "byts" })
    expect(violations).toHaveLength(1)
    expect(violations[0]).toContain("pointsSourceAggregate")
    expect(violations[0]).toContain("byts")
  })

  it("admits a weighted aggregate naming both its source and its weight field", () => {
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "weighted",
        pointsSource: "session-tracking",
        pointsSourceWeightField: "safetyLevel",
      })
    ).toEqual([])
  })

  it("rejects weighted without a weight field, which would weight every hour alike", () => {
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "weighted",
        pointsSource: "session-tracking",
      })
    ).toEqual(['pointsSourceAggregate="weighted" requires "pointsSourceWeightField"'])
  })

  it("rejects weighted without a source", () => {
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "weighted",
        pointsSourceWeightField: "safetyLevel",
      })
    ).toEqual(['pointsSourceAggregate="weighted" requires "pointsSource"'])
  })

  it("rejects bytes without any prefix", () => {
    expect(pass({ pointsSourceKind: "windowed", pointsSourceAggregate: "bytes" })).toEqual([
      'pointsSourceAggregate="bytes" requires one of "pointsPathPrefix", "pointsPathPrefixes"',
    ])
  })

  it("rejects sum missing either source or pointField", () => {
    expect(
      pass({ pointsSourceKind: "windowed", pointsSourceAggregate: "sum", pointsSource: "session" })
    ).toEqual(['pointsSourceAggregate="sum" requires "pointsSourcePointField"'])
    expect(
      pass({
        pointsSourceKind: "windowed",
        pointsSourceAggregate: "sum",
        pointsSourcePointField: "lovePoints",
      })
    ).toEqual(['pointsSourceAggregate="sum" requires "pointsSource"'])
  })

  it("rejects count without source", () => {
    expect(pass({ pointsSourceKind: "windowed", pointsSourceAggregate: "count" })).toEqual([
      'pointsSourceAggregate="count" requires "pointsSource"',
    ])
  })
})
