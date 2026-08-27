import { describe, expect, test } from "bun:test"
import type { GroupGranularity } from "../schema/view-data"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { getPageGroupDefinition } from "./apply-grouping"
import { type GroupableRow, type PageGroupDefinition } from "./apply-grouping-shared"

function defOf(
  groupBy: string,
  properties: readonly PropertyDefinition[],
  granularity?: GroupGranularity
): PageGroupDefinition {
  const def = getPageGroupDefinition(groupBy, properties, null, granularity)
  if (def === null) throw new Error(`expected group definition for ${groupBy}`)
  return def
}

type TestRow = GroupableRow & { readonly _id: string }

function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

const dateDef: PropertyDefinition = { id: "due", title: "Due", type: "calendar-date" }
const instantDef: PropertyDefinition = { id: "created", title: "Created", type: "instant" }

describe("getPageGroupDefinition — granularity", () => {
  test("calendar-date 'none' keeps the exact day", () => {
    const def = defOf("due", [dateDef], "none")
    expect(def.getKey(row("1", { due: "2026-06-10" }))).toBe("2026-06-10")
  })

  test("calendar-date 'week' buckets to the Monday week-start", () => {
    const def = defOf("due", [dateDef], "week")
    expect(def.getKey(row("1", { due: "2026-06-10" }))).toBe("2026-06-08")
  })

  test("calendar-date 'week' labels the bucket 'Week of …'", () => {
    const def = defOf("due", [dateDef], "week")
    expect(def.getLabel("2026-06-08")).toBe("Week of Jun 8, 2026")
  })

  test("calendar-date 'month' buckets to YYYY-MM", () => {
    const def = defOf("due", [dateDef], "month")
    expect(def.getKey(row("1", { due: "2026-06-10" }))).toBe("2026-06")
  })

  test("calendar-date 'month' labels the bucket as month name + year", () => {
    const def = defOf("due", [dateDef], "month")
    expect(def.getLabel("2026-06")).toBe("June 2026")
  })

  test("calendar-date 'year' buckets to YYYY", () => {
    const def = defOf("due", [dateDef], "year")
    expect(def.getKey(row("1", { due: "2026-06-10" }))).toBe("2026")
  })

  test("calendar-date 'year' labels the bucket as the year", () => {
    const def = defOf("due", [dateDef], "year")
    expect(def.getLabel("2026")).toBe("2026")
  })

  test("missing value returns __none__ regardless of granularity", () => {
    const def = defOf("due", [dateDef], "month")
    expect(def.getKey(row("1", {}))).toBe("__none__")
    expect(def.getLabel("__none__")).toBe("No Value")
  })

  test("instant 'month' routes through the ESO logical day then buckets", () => {
    const def = defOf("created", [instantDef], "month")
    const ts = new Date("2026-06-10T12:00:00Z").getTime()
    expect(def.getKey(row("1", { created: ts }))).toBe("2026-06")
  })

  test("instant 'week' buckets the ESO day to its Monday week-start", () => {
    const def = defOf("created", [instantDef], "week")
    const ts = new Date("2026-06-10T12:00:00Z").getTime()
    expect(def.getKey(row("1", { created: ts }))).toBe("2026-06-08")
  })
})
