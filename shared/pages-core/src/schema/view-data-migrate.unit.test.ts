import { describe, expect, test } from "bun:test"
import { isRecord } from "../../../utils-narrow/src/is-record"
import { migrateViewData, parseViewDataJSON } from "./view-data"

function asRecord(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`expected plain object, got ${typeof value}: ${String(value)}`)
  }
  return value
}

function asSortRows(value: unknown): ReadonlyArray<{ field: string; direction: string }> {
  if (!Array.isArray(value)) {
    throw new Error(`expected sort rows array, got ${typeof value}`)
  }
  return value.map((row) => {
    if (!isRecord(row)) {
      throw new Error(`expected sort row object, got ${typeof row}`)
    }
    const { field, direction } = row
    if (typeof field !== "string" || typeof direction !== "string") {
      throw new Error(`expected {field: string, direction: string}, got ${JSON.stringify(row)}`)
    }
    return { field, direction }
  })
}

describe("migrateViewData", () => {
  test("adds version: 1 when missing", () => {
    const input = { layout: "table" }
    const migrated = asRecord(migrateViewData(input))
    expect(migrated.version).toBe(1)
  })

  test("preserves existing version", () => {
    const input = { version: 1, layout: "grid" }
    const migrated = asRecord(migrateViewData(input))
    expect(migrated.version).toBe(1)
  })

  test("normalizes direction: manual to asc in sorts", () => {
    const input = {
      sorts: [
        { field: "name", direction: "manual" },
        { field: "date", direction: "desc" },
      ],
    }
    const migrated = asRecord(migrateViewData(input))
    const sorts = asSortRows(migrated.sorts)
    expect(sorts[0]?.direction).toBe("asc")
    expect(sorts[1]?.direction).toBe("desc")
  })

  test("passes through non-object input unchanged", () => {
    expect(migrateViewData(null)).toBeNull()
    expect(migrateViewData("string")).toBe("string")
    expect(migrateViewData(42)).toBe(42)
  })

  test("collapses legacy groups: [x] to group_by: x", () => {
    const migrated = asRecord(migrateViewData({ groups: ["status"] }))
    expect(migrated.group_by).toBe("status")
    expect(migrated.groups).toBeUndefined()
  })

  test("multi-element legacy groups collapses to first element", () => {
    const migrated = asRecord(migrateViewData({ groups: ["first", "second"] }))
    expect(migrated.group_by).toBe("first")
    expect(migrated.groups).toBeUndefined()
  })

  test("empty legacy groups array yields no group_by", () => {
    const migrated = asRecord(migrateViewData({ groups: [] }))
    expect(migrated.group_by).toBeUndefined()
    expect(migrated.groups).toBeUndefined()
  })

  test("legacy groups is dropped and parse succeeds", () => {
    const result = parseViewDataJSON({ groups: ["status"] })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.group_by).toBe("status")
    }
  })

  test("fills group_granularity: 'none' when missing", () => {
    const migrated = asRecord(migrateViewData({ version: 1, group_by: "due" }))
    expect(migrated.group_granularity).toBe("none")
  })

  test("preserves an existing group_granularity", () => {
    const migrated = asRecord(
      migrateViewData({ version: 1, group_by: "due", group_granularity: "week" })
    )
    expect(migrated.group_granularity).toBe("week")
  })
})

describe("migrateViewData robustness", () => {
  test("idempotence: migrate(migrate(x)) equals migrate(x)", () => {
    const input = {
      layout: "table",
      sorts: [
        { field: "a", direction: "manual" },
        { field: "b", direction: "desc" },
      ],
    }
    const once = migrateViewData(input)
    const twice = migrateViewData(once)
    expect(twice).toEqual(once)
  })

  test("idempotence on already-migrated data", () => {
    const already = {
      version: 1,
      layout: "grid",
      sorts: [{ field: "x", direction: "asc" }],
      page_size: 12,
      group_page_size: 6,
      item_page_size: 12,
      group_granularity: "none",
    }
    const migrated = migrateViewData(already)
    expect(migrated).toEqual(already)
  })

  test("mixed legacy: missing version AND direction:'manual' in same input", () => {
    const input = {
      layout: "table",
      sorts: [{ field: "name", direction: "manual" }],
    }
    const migrated = asRecord(migrateViewData(input))
    expect(migrated.version).toBe(1)
    const sorts = asSortRows(migrated.sorts)
    expect(sorts[0]?.direction).toBe("asc")
  })

  test("preserves unrelated fields (layout, visible_properties, zones, pageTypeId)", () => {
    const input = {
      layout: "board",
      visible_properties: ["a", "b", "c"],
      zones: { header: { title: true }, footer: { count: 5 } },
      pageTypeId: "typeXYZ",
    }
    const migrated = asRecord(migrateViewData(input))
    expect(migrated.layout).toBe("board")
    expect(migrated.visible_properties).toEqual(["a", "b", "c"])
    expect(migrated.zones).toEqual({ header: { title: true }, footer: { count: 5 } })
    expect(migrated.pageTypeId).toBe("typeXYZ")
  })

  test("non-object: string input passes through", () => {
    expect(migrateViewData("hello")).toBe("hello")
  })

  test("non-object: number input passes through", () => {
    expect(migrateViewData(3.14)).toBe(3.14)
  })

  test("non-object: null input passes through as null", () => {
    expect(migrateViewData(null)).toBeNull()
  })

  test("non-object: array input is handled (migrates as record)", () => {
    const result = migrateViewData([1, 2, 3])
    expect(result).not.toBeNull()
    expect(typeof result).toBe("object")
  })

  test("preserves sorts when none have direction:'manual'", () => {
    const input = {
      sorts: [
        { field: "a", direction: "asc" },
        { field: "b", direction: "desc" },
      ],
    }
    const migrated = asRecord(migrateViewData(input))
    expect(migrated.sorts).toEqual(input.sorts)
  })
})
