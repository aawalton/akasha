import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types"
import { computeAggregate } from "./aggregate"
import type { PageTypePropertiesMap } from "./rollup"

describe("computeAggregate — pre-fold filter", () => {
  const projects = [
    { id: "a", data: { status: "exploration" } satisfies PageDataJSON },
    { id: "b", data: { status: "exploration", claimedAgent: "ag1" } satisfies PageDataJSON },
    { id: "c", data: { status: "plan" } satisfies PageDataJSON },
    { id: "d", data: { status: "implementation" } satisfies PageDataJSON },
    { id: "e", data: { status: "done" } satisfies PageDataJSON },
    { id: "f", data: { status: "done" } satisfies PageDataJSON },
  ]
  const currentPageData = { projects: ["a", "b", "c", "d", "e", "f"] } satisfies PageDataJSON
  const base = { relationPropertyId: "projects", targetPropertyId: "", function: "count" as const }

  test("count — unfiltered counts all related pages", () => {
    expect(computeAggregate(base, currentPageData, projects)).toBe(6)
  })

  test("blue — exploration AND claimedAgent IS NULL", () => {
    const filter = {
      op: "and" as const,
      filters: [
        { op: "eq" as const, property: "status", value: "exploration" },
        { op: "is_null" as const, property: "claimedAgent" },
      ],
    }
    expect(computeAggregate({ ...base, filter }, currentPageData, projects)).toBe(1)
  })

  test("yellow — (claimed exploration) OR prep status", () => {
    const filter = {
      op: "or" as const,
      filters: [
        {
          op: "and" as const,
          filters: [
            { op: "eq" as const, property: "status", value: "exploration" },
            { op: "is_not_null" as const, property: "claimedAgent" },
          ],
        },
        {
          op: "in" as const,
          property: "status",
          values: ["problem", "intent", "principles", "plan"],
        },
      ],
    }
    expect(computeAggregate({ ...base, filter }, currentPageData, projects)).toBe(2)
  })

  test("green — done total (count == done)", () => {
    const filter = { op: "eq" as const, property: "status", value: "done" }
    expect(computeAggregate({ ...base, filter }, currentPageData, projects)).toBe(2)
  })

  test("filter composes with sum over a numeric target", () => {
    const scored = [
      { id: "x", data: { status: "done", score: 5 } satisfies PageDataJSON },
      { id: "y", data: { status: "plan", score: 10 } satisfies PageDataJSON },
      { id: "z", data: { status: "done", score: 7 } satisfies PageDataJSON },
    ]
    const cfg = {
      relationPropertyId: "projects",
      targetPropertyId: "score",
      function: "sum" as const,
      filter: { op: "eq" as const, property: "status", value: "done" },
    }
    expect(computeAggregate(cfg, { projects: ["x", "y", "z"] }, scored)).toBe(12)
  })
})

describe("computeAggregate over a computed target", () => {
  const SESSION_TYPE = "session-type"

  const sessionDefs: readonly PropertyDefinition[] = [
    {
      id: "durationSeconds",
      title: "Duration Seconds",
      type: "number",
      config: { expression: "(endTime - startTime) / 1000" },
    },
    {
      id: "weightedValue",
      title: "Weighted Value",
      type: "number",
      config: { expression: "value * ((endTime - startTime) / 1000)" },
    },
  ]

  const pageTypes: PageTypePropertiesMap = new Map([[SESSION_TYPE, sessionDefs]])

  const sessions = [
    {
      id: "s1",
      data: {
        pageTypeId: SESSION_TYPE,
        startTime: 1000,
        endTime: 4000,
        value: 2,
      } satisfies PageDataJSON,
    },
    {
      id: "s2",
      data: {
        pageTypeId: SESSION_TYPE,
        startTime: 0,
        endTime: 10000,
        value: 5,
      } satisfies PageDataJSON,
    },
  ]

  const currentPageData = { sessions: ["s1", "s2"] } satisfies PageDataJSON

  test("sum folds the resolved formula value (durationSeconds)", () => {
    const cfg = {
      relationPropertyId: "sessions",
      targetPropertyId: "durationSeconds",
      function: "sum" as const,
    }
    expect(computeAggregate(cfg, currentPageData, sessions, pageTypes)).toBe(13)
  })

  test("sum folds a formula with a stored-number dependency (weightedValue)", () => {
    const cfg = {
      relationPropertyId: "sessions",
      targetPropertyId: "weightedValue",
      function: "sum" as const,
    }
    expect(computeAggregate(cfg, currentPageData, sessions, pageTypes)).toBe(56)
  })

  test("avg over a formula target", () => {
    const cfg = {
      relationPropertyId: "sessions",
      targetPropertyId: "durationSeconds",
      function: "avg" as const,
    }
    expect(computeAggregate(cfg, currentPageData, sessions, pageTypes)).toBe(6.5)
  })

  test("max over a formula target", () => {
    const cfg = {
      relationPropertyId: "sessions",
      targetPropertyId: "weightedValue",
      function: "max" as const,
    }
    expect(computeAggregate(cfg, currentPageData, sessions, pageTypes)).toBe(50)
  })

  test("first preserves relation order over a formula target", () => {
    const cfg = {
      relationPropertyId: "sessions",
      targetPropertyId: "durationSeconds",
      function: "first" as const,
    }
    expect(computeAggregate(cfg, currentPageData, sessions, pageTypes)).toBe(3)
  })

  test("stored target still works when pageTypes omitted (backward compatible)", () => {
    const stored = [
      { id: "x1", data: { score: 10 } satisfies PageDataJSON },
      { id: "x2", data: { score: 20 } satisfies PageDataJSON },
    ]
    const cfg = {
      relationPropertyId: "items",
      targetPropertyId: "score",
      function: "sum" as const,
    }
    expect(computeAggregate(cfg, { items: ["x1", "x2"] }, stored)).toBe(30)
  })

  test("stored target read as written where the def carries no expression", () => {
    const storedDefs: readonly PropertyDefinition[] = [
      { id: "score", title: "Score", type: "number", config: {} },
    ]
    const types: PageTypePropertiesMap = new Map([[SESSION_TYPE, storedDefs]])
    const stored = [
      { id: "x1", data: { pageTypeId: SESSION_TYPE, score: 10 } satisfies PageDataJSON },
      { id: "x2", data: { pageTypeId: SESSION_TYPE, score: 20 } satisfies PageDataJSON },
    ]
    const cfg = {
      relationPropertyId: "items",
      targetPropertyId: "score",
      function: "sum" as const,
    }
    expect(computeAggregate(cfg, { items: ["x1", "x2"] }, stored, types)).toBe(30)
  })
})
