import { describe, expect, test } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import type { ViewSort } from "../schema/view-data"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { type GroupableRow, type GroupedResult } from "./apply-grouping-shared"
import { sortGroupedResults } from "./apply-grouping-sort"

function last<T>(array: readonly T[]): T {
  const value = array[array.length - 1]
  if (value === undefined) throw new Error("expected non-empty array")
  return value
}

function row(id: string, data: Record<string, ReadonlyJSONValue>): GroupableRow {
  return { ...data, _id: id }
}

const selectDef: PropertyDefinition = {
  id: "status",
  title: "Status",
  type: "select",
  config: {
    options: [
      { id: "open", label: "Open" },
      { id: "closed", label: "Closed" },
      { id: "pending", label: "Pending" },
    ],
  },
}
describe("sortGroupedResults", () => {
  function group(key: string, label: string, count: number): GroupedResult {
    const items: GroupableRow[] = Array.from({ length: count }, (_, i) => row(`${key}-${i}`, {}))
    return { key, label, items }
  }

  test("empty sorts returns groups unchanged", () => {
    const groups = [group("b", "Beta", 2), group("a", "Alpha", 1)]
    const result = sortGroupedResults(groups, [], "status", [selectDef])
    expect(result.map((g) => g.key)).toEqual(["b", "a"])
  })

  test("sort by label asc", () => {
    const groups = [group("b", "Beta", 2), group("a", "Alpha", 1), group("c", "Charlie", 3)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result.map((g) => g.label)).toEqual(["Alpha", "Beta", "Charlie"])
  })

  test("sort by label desc", () => {
    const groups = [group("a", "Alpha", 1), group("b", "Beta", 2), group("c", "Charlie", 3)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "desc" }], "status", [
      selectDef,
    ])
    expect(result.map((g) => g.label)).toEqual(["Charlie", "Beta", "Alpha"])
  })

  test("sort by count asc", () => {
    const groups = [group("a", "A", 3), group("b", "B", 1), group("c", "C", 2)]
    const result = sortGroupedResults(groups, [{ field: "count", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result.map((g) => g.items.length)).toEqual([1, 2, 3])
  })

  test("sort by count desc", () => {
    const groups = [group("a", "A", 1), group("b", "B", 3), group("c", "C", 2)]
    const result = sortGroupedResults(groups, [{ field: "count", direction: "desc" }], "status", [
      selectDef,
    ])
    expect(result.map((g) => g.items.length)).toEqual([3, 2, 1])
  })

  test("sort by groupBy field with explicit manual sort uses option index", () => {
    const manualSelectDef: PropertyDefinition = {
      ...selectDef,
      sort: "manual",
    }
    const groups = [
      group("pending", "Pending", 1),
      group("open", "Open", 2),
      group("closed", "Closed", 3),
    ]
    const result = sortGroupedResults(groups, [{ field: "status", direction: "asc" }], "status", [
      manualSelectDef,
    ])
    expect(result.map((g) => g.key)).toEqual(["open", "closed", "pending"])
  })

  test("sort by groupBy field with default sort (no `sort` set) uses option index", () => {
    const groups = [
      group("pending", "Pending", 1),
      group("open", "Open", 2),
      group("closed", "Closed", 3),
    ]
    const result = sortGroupedResults(groups, [{ field: "status", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result.map((g) => g.key)).toEqual(["open", "closed", "pending"])
  })

  test("sort by groupBy field with explicit sort:'alpha' uses label alpha", () => {
    const alphaSelectDef: PropertyDefinition = { ...selectDef, sort: "alpha" }
    const groups = [
      group("pending", "Pending", 1),
      group("open", "Open", 2),
      group("closed", "Closed", 3),
    ]
    const result = sortGroupedResults(groups, [{ field: "status", direction: "asc" }], "status", [
      alphaSelectDef,
    ])
    expect(result.map((g) => g.label)).toEqual(["Closed", "Open", "Pending"])
  })

  test("__none__ sorts first on asc direction", () => {
    const groups = [group("a", "Alpha", 2), group("__none__", "No Value", 1), group("b", "Beta", 3)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(requireFirst(result).key).toBe("__none__")
  })

  test("__none__ sorts last on desc direction", () => {
    const groups = [group("__none__", "No Value", 1), group("a", "Alpha", 2), group("b", "Beta", 3)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "desc" }], "status", [
      selectDef,
    ])
    expect(last(result).key).toBe("__none__")
  })

  test("__none__ sorts last with count desc sort", () => {
    const groups = [group("__none__", "No Value", 100), group("a", "Alpha", 1)]
    const result = sortGroupedResults(groups, [{ field: "count", direction: "desc" }], "status", [
      selectDef,
    ])
    expect(last(result).key).toBe("__none__")
  })

  test("legacy defined-order normalizes to groupBy asc", () => {
    const manualSelectDef: PropertyDefinition = { ...selectDef, sort: "manual" }
    const groups = [
      group("pending", "Pending", 1),
      group("open", "Open", 2),
      group("closed", "Closed", 3),
    ]
    const result = sortGroupedResults(
      groups,
      [{ field: "defined-order", direction: "asc" }],
      "status",
      [manualSelectDef]
    )
    expect(result.map((g) => g.key)).toEqual(["open", "closed", "pending"])
  })

  test("legacy manual direction normalizes to asc", () => {
    const groups = [group("b", "Beta", 2), group("a", "Alpha", 1)]
    const legacyManualSort: ViewSort = { field: "label", direction: "asc" }
    Object.assign(legacyManualSort, { direction: "manual" })
    const result = sortGroupedResults(groups, [legacyManualSort], "status", [selectDef])
    expect(result.map((g) => g.label)).toEqual(["Alpha", "Beta"])
  })

  test("multi-key sort with tie-break", () => {
    const groups = [group("a", "Alpha", 2), group("b", "Alpha", 1), group("c", "Beta", 3)]
    const result = sortGroupedResults(
      groups,
      [
        { field: "label", direction: "asc" },
        { field: "count", direction: "desc" },
      ],
      "status",
      [selectDef]
    )
    expect(result.map((g) => g.key)).toEqual(["a", "b", "c"])
  })

  test("single group returns unchanged", () => {
    const groups = [group("a", "Alpha", 1)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result).toHaveLength(1)
    expect(requireFirst(result).key).toBe("a")
  })

  test("all __none__ groups preserve order", () => {
    const groups = [group("__none__", "No Value", 1), group("__none__", "No Value", 2)]
    const result = sortGroupedResults(groups, [{ field: "label", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result).toHaveLength(2)
  })

  test("empty groups array returns empty", () => {
    const result = sortGroupedResults([], [{ field: "label", direction: "asc" }], "status", [
      selectDef,
    ])
    expect(result).toEqual([])
  })

  test("does not mutate input array", () => {
    const groups = [group("b", "Beta", 2), group("a", "Alpha", 1)]
    const original = [...groups]
    sortGroupedResults(groups, [{ field: "label", direction: "asc" }], "status", [selectDef])
    expect(groups.map((g) => g.key)).toEqual(original.map((g) => g.key))
  })
})
