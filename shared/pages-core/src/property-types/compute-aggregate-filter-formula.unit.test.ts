import { describe, expect, test } from "bun:test"
import type { PageDataJSON } from "../types.ts"
import { computeAggregate } from "./aggregate.ts"

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
