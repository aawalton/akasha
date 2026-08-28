import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types.ts"
import { computeFillAggregatesForPage } from "./aggregate.ts"

describe("computeFillAggregatesForPage", () => {
  const DAILY_TYPE = "daily-type"
  const SESSION_TYPE = "session-type"

  const sessionDefs: readonly PropertyDefinition[] = [
    { id: "durationSeconds", title: "Duration Seconds", type: "number", config: {} },
    { id: "weightedValue", title: "Weighted Value", type: "number", config: {} },
  ]

  const dailyDefs: readonly PropertyDefinition[] = [
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

  test("fills aggregate keys absent from the server row", () => {
    const data = { pageTypeId: DAILY_TYPE, sessions: ["s1", "s2"] } satisfies PageDataJSON
    const result = computeFillAggregatesForPage(data, dailyDefs, relatedPages)
    expect(result).toEqual({
      totalDurationSeconds: 13,
      totalWeightedValue: 56,
    })
  })

  test("fills keys the server resolved to null", () => {
    const data = {
      pageTypeId: DAILY_TYPE,
      sessions: ["s1", "s2"],
      totalDurationSeconds: null,
    } satisfies PageDataJSON
    const result = computeFillAggregatesForPage(data, dailyDefs, relatedPages)
    expect(result).toEqual({
      totalDurationSeconds: 13,
      totalWeightedValue: 56,
    })
  })

  test("never overwrites an aggregate the server already resolved", () => {
    const data = {
      pageTypeId: DAILY_TYPE,
      sessions: ["s1", "s2"],
      totalDurationSeconds: 999,
    } satisfies PageDataJSON
    const result = computeFillAggregatesForPage(data, dailyDefs, relatedPages)
    expect(result).toEqual({ totalWeightedValue: 56 })
  })

  test("returns an empty object when there are no aggregate definitions", () => {
    const data = {
      pageTypeId: SESSION_TYPE,
      startTime: 0,
      endTime: 1000,
      value: 1,
    } satisfies PageDataJSON
    const result = computeFillAggregatesForPage(data, sessionDefs, relatedPages)
    expect(result).toEqual({})
  })
})
