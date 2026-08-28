import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types.ts"
import { computeAggregatesForPage } from "./aggregate.ts"

describe("computeAggregatesForPage", () => {
  const DAILY_TYPE = "daily-type"
  const SESSION_TYPE = "session-type"

  const sessionDefs: readonly PropertyDefinition[] = [
    { id: "durationSeconds", title: "Duration Seconds", type: "number", config: {} },
    { id: "weightedValue", title: "Weighted Value", type: "number", config: {} },
  ]

  const dailyDefs: readonly PropertyDefinition[] = [
    { id: "date", title: "Date", type: "calendar-date", config: {} },
    {
      id: "sessions",
      title: "Sessions",
      type: "multi-relation",
      config: { targetPageTypeId: SESSION_TYPE },
    },
    {
      id: "totalDurationSeconds",
      title: "Total Duration",
      type: "aggregate",
      config: {
        relationPropertyId: "sessions",
        targetPropertyId: "durationSeconds",
        function: "sum",
      },
    },
    {
      id: "totalWeightedValue",
      title: "Total Weighted",
      type: "aggregate",
      config: {
        relationPropertyId: "sessions",
        targetPropertyId: "weightedValue",
        function: "sum",
      },
    },
  ]

  const relatedPages = [
    {
      id: "s1",
      data: { pageTypeId: SESSION_TYPE, durationSeconds: 3, weightedValue: 6 } satisfies PageDataJSON,
    },
    {
      id: "s2",
      data: { pageTypeId: SESSION_TYPE, durationSeconds: 10, weightedValue: 50 } satisfies PageDataJSON,
    },
  ]

  const data = { pageTypeId: DAILY_TYPE, sessions: ["s1", "s2"] } satisfies PageDataJSON

  test("folds every aggregate def over its target", () => {
    const result = computeAggregatesForPage(data, dailyDefs, relatedPages)
    expect(result).toEqual({
      totalDurationSeconds: 13,
      totalWeightedValue: 56,
    })
  })

  test("returns empty object when there are no aggregate definitions", () => {
    const result = computeAggregatesForPage(data, sessionDefs, relatedPages)
    expect(result).toEqual({})
  })

  test("missing relation yields null for value-folding aggregates", () => {
    const empty = { pageTypeId: DAILY_TYPE } satisfies PageDataJSON
    const result = computeAggregatesForPage(empty, dailyDefs, relatedPages)
    expect(result).toEqual({
      totalDurationSeconds: null,
      totalWeightedValue: null,
    })
  })
})
