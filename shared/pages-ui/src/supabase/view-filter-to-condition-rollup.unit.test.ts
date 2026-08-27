import { describe, expect, it } from "bun:test"
import type { PageCondition } from "@shared/pages-core/page-types"
import type { PageTypePropertiesMap } from "@shared/pages-core/property-types/rollup"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { viewFilterToCondition } from "./view-filter-to-condition"

function expectOne(result: readonly PageCondition[] | null): PageCondition {
  if (result === null || result.length !== 1) throw new Error(`expected 1 condition`)
  const [first] = result
  if (!first) throw new Error("expected a condition")
  return first
}

describe("sentinel-through-rollup: rollup walks to terminal date type before resolving", () => {
  const A_TYPE_ID = "00000000-0000-0000-0000-00000000000a"
  const B_TYPE_ID = "00000000-0000-0000-0000-00000000000b"

  const dueRollupOnA: PropertyDefinition = {
    id: "dueRollup",
    title: "Due (rollup)",
    type: "rollup",
    config: { relationPropertyId: "relB", targetPropertyId: "dueDate" },
  }
  const relBOnA: PropertyDefinition = {
    id: "relB",
    title: "Rel B",
    type: "relation",
    config: { targetPageTypeId: B_TYPE_ID },
  }
  const dueDateOnB: PropertyDefinition = {
    id: "dueDate",
    title: "Due Date",
    type: "calendar-date",
  }

  const propertiesByPageType: PageTypePropertiesMap = new Map([
    [A_TYPE_ID, [dueRollupOnA, relBOnA]],
    [B_TYPE_ID, [dueDateOnB]],
  ])

  const callRollup = (op: string, val: unknown) =>
    viewFilterToCondition("dueRollup", op, val, dueRollupOnA, A_TYPE_ID, propertiesByPageType)

  it("lte sentinel on rollup-to-calendar-date resolves to YYYY-MM-DD string", () => {
    const cond = expectOne(callRollup("lte", { sentinel: "today" }))
    if (!("lte" in cond)) throw new Error("expected lte condition")
    expect(cond.key).toBe("dueRollup")
    expect(typeof cond.lte).toBe("string")
    expect(cond.lte).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it("gte literal on rollup-to-calendar-date passes the literal through", () => {
    expect(callRollup("gte", "2026-04-26")).toEqual([{ key: "dueRollup", gte: "2026-04-26" }])
  })

  it("lte sentinel on rollup-to-instant resolves to end-of-day ms-epoch number", () => {
    const completedAtOnB: PropertyDefinition = {
      id: "completedAt",
      title: "Completed At",
      type: "instant",
    }
    const completedRollupOnA: PropertyDefinition = {
      id: "completedRollup",
      title: "Completed (rollup)",
      type: "rollup",
      config: { relationPropertyId: "relB", targetPropertyId: "completedAt" },
    }
    const map: PageTypePropertiesMap = new Map([
      [A_TYPE_ID, [completedRollupOnA, relBOnA]],
      [B_TYPE_ID, [completedAtOnB]],
    ])
    const result = viewFilterToCondition(
      "completedRollup",
      "lte",
      { sentinel: "today" },
      completedRollupOnA,
      A_TYPE_ID,
      map
    )
    const cond = expectOne(result)
    if (!("lte" in cond)) throw new Error("expected lte condition")
    expect(typeof cond.lte).toBe("number")
    expect(typeof cond.lte === "number" ? cond.lte : 0).toBeGreaterThan(0)
  })

  it("rollup with no resolution context falls through to client-side", () => {
    expect(
      viewFilterToCondition("dueRollup", "lte", { sentinel: "today" }, dueRollupOnA)
    ).toBeNull()
  })

  it("rollup whose chain cannot be resolved (missing target type) falls through", () => {
    const unreachableMap: PageTypePropertiesMap = new Map([[A_TYPE_ID, [dueRollupOnA, relBOnA]]])
    expect(
      viewFilterToCondition(
        "dueRollup",
        "lte",
        { sentinel: "today" },
        dueRollupOnA,
        A_TYPE_ID,
        unreachableMap
      )
    ).toBeNull()
  })

  it("gt sentinel on rollup-to-calendar-date resolves to YYYY-MM-DD string", () => {
    const cond = expectOne(callRollup("gt", { sentinel: "today" }))
    if (!("gt" in cond)) throw new Error("expected gt condition")
    expect(cond.key).toBe("dueRollup")
    expect(typeof cond.gt).toBe("string")
    expect(cond.gt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it("equals sentinel on rollup-to-calendar-date resolves to YYYY-MM-DD string", () => {
    const cond = expectOne(callRollup("equals", { sentinel: "today" }))
    if (!("eq" in cond)) throw new Error("expected eq condition")
    expect(cond.key).toBe("dueRollup")
    expect(typeof cond.eq).toBe("string")
    expect(cond.eq).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
