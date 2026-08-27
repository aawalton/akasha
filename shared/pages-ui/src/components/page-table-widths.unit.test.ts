import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { PageRow } from "../view-engine/page-row"
import type { PageTableColumn } from "./page-table-shared"
import {
  MIN_COLUMN_PX,
  propertyValueDisplayLength,
  valueDisplayLength,
  withColumnWidths,
} from "./page-table-widths"

describe("valueDisplayLength", () => {
  it("returns 0 for null/undefined", () => {
    expect(valueDisplayLength(null)).toBe(0)
    expect(valueDisplayLength(undefined)).toBe(0)
  })

  it("returns string/number/boolean rendered length", () => {
    expect(valueDisplayLength("hello")).toBe(5)
    expect(valueDisplayLength(42)).toBe(2)
    expect(valueDisplayLength(true)).toBe(4)
  })

  it("sums array element widths plus separators", () => {
    expect(valueDisplayLength(["ab", "c"])).toBe(5)
    expect(valueDisplayLength([])).toBe(0)
  })

  it("uses a relation-like object's title", () => {
    expect(valueDisplayLength({ id: "x", title: "Acme" })).toBe(4)
  })
})

const titleCol: PageTableColumn = { id: "__title__", label: "Name" }
const codeCol: PageTableColumn = { id: "code", label: "Code" }

describe("withColumnWidths", () => {
  it("returns columns unchanged when there are no columns", () => {
    expect(withColumnWidths([], [])).toEqual([])
  })

  it("assigns each column a pixel width at or above the readable floor", () => {
    const rows: PageRow[] = [
      { _id: "1", title: "A reasonably long descriptive title", code: "X" },
      { _id: "2", title: "Another long title here", code: "Y" },
    ]
    const out = withColumnWidths([titleCol, codeCol], rows)
    for (const c of out) {
      expect(c.width ?? 0).toBeGreaterThanOrEqual(MIN_COLUMN_PX)
      expect(Number.isInteger(c.width)).toBe(true)
    }
  })

  it("floors a sparse column at MIN_COLUMN_PX even when its content is tiny", () => {
    const rows: PageRow[] = [
      { _id: "1", title: "A reasonably long descriptive title", code: "X" },
      { _id: "2", title: "Another long title here", code: "Y" },
    ]
    const [, code] = withColumnWidths([titleCol, codeCol], rows)
    expect(code?.width).toBe(MIN_COLUMN_PX)
  })

  it("gives a content-heavier column a larger width than a sparse one", () => {
    const rows: PageRow[] = [
      { _id: "1", title: "A reasonably long descriptive title", code: "X" },
      { _id: "2", title: "Another long title here", code: "Y" },
    ]
    const [title, code] = withColumnWidths([titleCol, codeCol], rows)
    expect(title?.width).toBeGreaterThan(code?.width ?? 0)
  })

  it("caps a dominating column so the sparse one keeps a real share (base floor)", () => {
    const longValue = "x".repeat(500)
    const rows: PageRow[] = [
      { _id: "1", title: longValue, code: "X" },
      { _id: "2", title: longValue, code: "Y" },
    ]
    const [, code] = withColumnWidths([titleCol, codeCol], rows)
    expect(code?.width ?? 0).toBeGreaterThan(10)
  })

  it("is order-independent (mean-based) and deterministic", () => {
    const rows: PageRow[] = [
      { _id: "1", title: "alpha", code: "X" },
      { _id: "2", title: "a much longer beta title", code: "YY" },
    ]
    const forward = withColumnWidths([titleCol, codeCol], rows)
    const reversed = withColumnWidths([titleCol, codeCol], [...rows].reverse())
    expect(forward).toEqual(reversed)
  })

  it("reads the title column's value from row.title", () => {
    const rows: PageRow[] = [{ _id: "1", title: "a long title value", code: "X" }]
    const [title] = withColumnWidths([titleCol, codeCol], rows)
    const [, code] = withColumnWidths([titleCol, codeCol], rows)
    expect(title?.width).toBeGreaterThan(code?.width ?? 0)
  })

  it("sizes a property column to its formatted display, not its raw value", () => {
    const iso = "2026-06-20T05:10:00+00:00"
    const instantDef: PropertyDefinition = {
      id: "start",
      title: "Start Time",
      type: "instant",
      config: { format: "absolute-time" },
    }
    const noteCol: PageTableColumn = { id: "note", label: "Note" }
    const startCol: PageTableColumn = { id: "start", label: "Start Time", def: instantDef }
    const rows: PageRow[] = [
      { _id: "1", title: "t", note: iso, start: iso },
      { _id: "2", title: "t", note: iso, start: iso },
    ]
    const [note, start] = withColumnWidths([noteCol, startCol], rows)
    expect(start?.width ?? 0).toBeLessThan(note?.width ?? 0)
  })
})

describe("propertyValueDisplayLength", () => {
  it("measures an instant by its formatted label, not the ISO string", () => {
    const def: PropertyDefinition = {
      id: "t",
      title: "T",
      type: "instant",
      config: { format: "absolute-time" },
    }
    const iso = "2026-06-20T05:10:00+00:00"
    expect(propertyValueDisplayLength(iso, def)).toBeLessThan(12)
    expect(propertyValueDisplayLength(iso, def)).toBeLessThan(iso.length)
  })

  it("measures a select by its option label, not the stored option id", () => {
    const def: PropertyDefinition = {
      id: "s",
      title: "Safety",
      type: "select",
      config: { options: [{ id: "opt-3-happy-safe-green", label: "3 Happy" }] },
    }
    expect(propertyValueDisplayLength("opt-3-happy-safe-green", def)).toBe("3 Happy".length)
  })

  it("measures a calendar-time by its 12h label", () => {
    const def: PropertyDefinition = { id: "ct", title: "CT", type: "calendar-time" }
    expect(propertyValueDisplayLength("23:00", def)).toBe("11:00 PM".length)
  })

  it("measures a far date by its smart-date label", () => {
    const def: PropertyDefinition = { id: "d", title: "D", type: "calendar-date" }
    expect(propertyValueDisplayLength("2000-01-15", def)).toBe("15 Jan 2000".length)
  })

  it("falls back to raw display length for plain text", () => {
    const def: PropertyDefinition = { id: "x", title: "X", type: "text" }
    expect(propertyValueDisplayLength("hello", def)).toBe(5)
  })
})
