import { describe, expect, test } from "bun:test"
import type { PageDataJSON } from "../types"
import { computeAggregate } from "./aggregate"

describe("computeAggregate", () => {
  const pages = [
    { id: "p1", data: { score: 10, label: "A" } satisfies PageDataJSON },
    { id: "p2", data: { score: 20, label: "B" } satisfies PageDataJSON },
    { id: "p3", data: { score: 30, label: "C" } satisfies PageDataJSON },
  ]

  const config = {
    relationPropertyId: "items",
    targetPropertyId: "score",
    function: "sum" as const,
  }

  test("sum — forward lookup through multi-relation array", () => {
    const currentPageData = { items: ["p1", "p2", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, pages)).toBe(60)
  })

  test("sum — subset of pages", () => {
    const currentPageData = { items: ["p1", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, pages)).toBe(40)
  })

  test("count — returns number of related pages", () => {
    const countConfig = { ...config, function: "count" as const }
    const currentPageData = { items: ["p1", "p2"] } satisfies PageDataJSON
    expect(computeAggregate(countConfig, currentPageData, pages)).toBe(2)
  })

  test("avg — average of target values", () => {
    const avgConfig = { ...config, function: "avg" as const }
    const currentPageData = { items: ["p1", "p2", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(avgConfig, currentPageData, pages)).toBe(20)
  })

  test("min — minimum target value", () => {
    const minConfig = { ...config, function: "min" as const }
    const currentPageData = { items: ["p1", "p2", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(minConfig, currentPageData, pages)).toBe(10)
  })

  test("max — maximum target value", () => {
    const maxConfig = { ...config, function: "max" as const }
    const currentPageData = { items: ["p1", "p2", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(maxConfig, currentPageData, pages)).toBe(30)
  })

  test("returns null for non-array relation value (non-count)", () => {
    const currentPageData = { items: "p1" } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, pages)).toBeNull()
  })

  test("returns 0 for non-array relation value with count function", () => {
    const countConfig = { ...config, function: "count" as const }
    const currentPageData = { items: "p1" } satisfies PageDataJSON
    expect(computeAggregate(countConfig, currentPageData, pages)).toBe(0)
  })

  test("returns null when relation property is missing (non-count)", () => {
    const currentPageData = {} satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, pages)).toBeNull()
  })

  test("returns 0 when relation property is missing with count function", () => {
    const countConfig = { ...config, function: "count" as const }
    const currentPageData = {} satisfies PageDataJSON
    expect(computeAggregate(countConfig, currentPageData, pages)).toBe(0)
  })

  test("returns null when no target values are numeric", () => {
    const currentPageData = { items: ["p1"] } satisfies PageDataJSON
    const labelConfig = {
      relationPropertyId: "items",
      targetPropertyId: "label",
      function: "sum" as const,
    }
    expect(computeAggregate(labelConfig, currentPageData, pages)).toBeNull()
  })

  test("count with empty array returns 0", () => {
    const countConfig = { ...config, function: "count" as const }
    const currentPageData = { items: [] } satisfies PageDataJSON
    expect(computeAggregate(countConfig, currentPageData, pages)).toBe(0)
  })

  test("ignores target page IDs not found in allPages", () => {
    const currentPageData = { items: ["p1", "missing-id"] } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, pages)).toBe(10)
  })

  test("handles string numbers in target values", () => {
    const stringPages = [
      { id: "s1", data: { score: "10" } satisfies PageDataJSON },
      { id: "s2", data: { score: "20" } satisfies PageDataJSON },
    ]
    const currentPageData = { items: ["s1", "s2"] } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, stringPages)).toBe(30)
  })

  test("handles empty allPages array", () => {
    const currentPageData = { items: ["p1", "p2"] } satisfies PageDataJSON
    expect(computeAggregate(config, currentPageData, [])).toBeNull()
    const countConfig = { ...config, function: "count" as const }
    expect(computeAggregate(countConfig, currentPageData, [])).toBe(0)
  })

  test("first — returns first non-null numeric value in relation-array order", () => {
    const firstConfig = { ...config, function: "first" as const }
    const currentPageData = { items: ["p2", "p1", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, pages)).toBe(20)
  })

  test("first — returns null when no numeric values", () => {
    const firstConfig = {
      relationPropertyId: "items",
      targetPropertyId: "label",
      function: "first" as const,
    }
    const currentPageData = { items: ["p1", "p2"] } satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, pages)).toBeNull()
  })

  test("first — returns null when relation array is empty", () => {
    const firstConfig = { ...config, function: "first" as const }
    const currentPageData = { items: [] } satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, pages)).toBeNull()
  })

  test("first — returns null when relation property is missing", () => {
    const firstConfig = { ...config, function: "first" as const }
    const currentPageData = {} satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, pages)).toBeNull()
  })

  test("first — returns null when relation value is non-array", () => {
    const firstConfig = { ...config, function: "first" as const }
    const currentPageData = { items: "p1" } satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, pages)).toBeNull()
  })

  test("first — skips null target values, returns next numeric", () => {
    const mixedPages = [
      { id: "m1", data: { score: null, label: "A" } satisfies PageDataJSON },
      { id: "m2", data: { score: 99, label: "B" } satisfies PageDataJSON },
      { id: "m3", data: { score: 7, label: "C" } satisfies PageDataJSON },
    ]
    const firstConfig = { ...config, function: "first" as const }
    const currentPageData = { items: ["m1", "m2", "m3"] } satisfies PageDataJSON
    expect(computeAggregate(firstConfig, currentPageData, mixedPages)).toBe(99)
  })

  test("count_distinct — returns count of distinct numeric values", () => {
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = { items: ["p1", "p2", "p3"] } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, pages)).toBe(3)
  })

  test("count_distinct — returns 0 (not null) when no numeric values found", () => {
    const distinctConfig = {
      relationPropertyId: "items",
      targetPropertyId: "label",
      function: "count_distinct" as const,
    }
    const currentPageData = { items: ["p1", "p2"] } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, pages)).toBe(0)
  })

  test("count_distinct — returns 0 when relation array is empty", () => {
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = { items: [] } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, pages)).toBe(0)
  })

  test("count_distinct — returns 0 when relation property is missing", () => {
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = {} satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, pages)).toBe(0)
  })

  test("count_distinct — returns 0 when relation value is non-array", () => {
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = { items: "p1" } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, pages)).toBe(0)
  })

  test("count_distinct — counts equal numbers as one", () => {
    const dupePages = [
      { id: "d1", data: { score: 10 } satisfies PageDataJSON },
      { id: "d2", data: { score: 20 } satisfies PageDataJSON },
      { id: "d3", data: { score: 10 } satisfies PageDataJSON },
      { id: "d4", data: { score: 30 } satisfies PageDataJSON },
    ]
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = { items: ["d1", "d2", "d3", "d4"] } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, dupePages)).toBe(3)
  })

  test("count_distinct — ignores null target values", () => {
    const mixedPages = [
      { id: "m1", data: { score: 10 } satisfies PageDataJSON },
      { id: "m2", data: { score: null } satisfies PageDataJSON },
      { id: "m3", data: { score: 20 } satisfies PageDataJSON },
      { id: "m4", data: { score: null } satisfies PageDataJSON },
    ]
    const distinctConfig = { ...config, function: "count_distinct" as const }
    const currentPageData = { items: ["m1", "m2", "m3", "m4"] } satisfies PageDataJSON
    expect(computeAggregate(distinctConfig, currentPageData, mixedPages)).toBe(2)
  })
})
