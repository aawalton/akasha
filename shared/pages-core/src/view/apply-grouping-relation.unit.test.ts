import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { ReadonlyJSONValue } from "../schema/pages"
import { type GroupableRow, type GroupedResult, type PageResolver } from "./apply-grouping-shared"
import { generateGroupSortOptions, getDefaultGroupSorts, makeGroupKeyByPropertyComparator, sortGroupedResults } from "./apply-grouping-sort"

type TestRow = GroupableRow & {
  readonly _id: string
}

function row(id: string, data: Record<string, ReadonlyJSONValue>): TestRow {
  return { ...data, _id: id }
}

const relationDef: PropertyDefinition = { id: "parent", title: "Parent", type: "relation" }
const multiRelationDef: PropertyDefinition = {
  id: "related",
  title: "Related",
  type: "multi-relation",
}

const relationTargets: Record<string, { id: string; title: string; sortOrder?: number }> = {
  faith: { id: "faith", title: "Faith", sortOrder: 1 },
  love: { id: "love", title: "Love", sortOrder: 2 },
  health: { id: "health", title: "Health", sortOrder: 3 },
  fun: { id: "fun", title: "Fun", sortOrder: 5 },
  misc: { id: "misc", title: "Misc" },
  bravo: { id: "bravo", title: "Bravo" },
}

const relationResolver: PageResolver = {
  resolve: (id) => relationTargets[id] ?? null,
}

describe("makeGroupKeyByPropertyComparator — relation with resolver", () => {
  test("relation compares by target sortOrder, not label", () => {
    const cmp = makeGroupKeyByPropertyComparator(relationDef, relationResolver)
    expect(cmp("fun", "Fun", "health", "Health")).toBeGreaterThan(0)
    expect(cmp("health", "Health", "fun", "Fun")).toBeLessThan(0)
    expect(cmp("faith", "Faith", "love", "Love")).toBeLessThan(0)
  })

  test("multi-relation compares by target sortOrder, not label", () => {
    const cmp = makeGroupKeyByPropertyComparator(multiRelationDef, relationResolver)
    expect(cmp("fun", "Fun", "health", "Health")).toBeGreaterThan(0)
    expect(cmp("love", "Love", "fun", "Fun")).toBeLessThan(0)
  })

  test("missing sortOrder sorts after present sortOrder", () => {
    const cmp = makeGroupKeyByPropertyComparator(relationDef, relationResolver)
    expect(cmp("bravo", "Bravo", "fun", "Fun")).toBeGreaterThan(0)
    expect(cmp("fun", "Fun", "bravo", "Bravo")).toBeLessThan(0)
  })

  test("ties on missing sortOrder fall back to label", () => {
    const cmp = makeGroupKeyByPropertyComparator(relationDef, relationResolver)
    expect(cmp("bravo", "Bravo", "misc", "Misc")).toBeLessThan(0)
    expect(cmp("misc", "Misc", "bravo", "Bravo")).toBeGreaterThan(0)
  })

  test("unresolvable keys fall back to label compare", () => {
    const cmp = makeGroupKeyByPropertyComparator(relationDef, relationResolver)
    expect(cmp("ghost-a", "Aaa", "ghost-b", "Bbb")).toBeLessThan(0)
    expect(cmp("ghost-a", "Aaa", "fun", "Fun")).toBeGreaterThan(0)
  })
})

describe("sortGroupedResults — relation groups order by target sortOrder", () => {
  function group(key: string, label: string, count: number): GroupedResult {
    const items: GroupableRow[] = Array.from({ length: count }, (_, i) => row(`${key}-${i}`, {}))
    return { key, label, items }
  }

  test("relation groups order by target sortOrder, not label alpha", () => {
    const groups = [
      group("fun", "Fun", 1),
      group("faith", "Faith", 2),
      group("health", "Health", 3),
      group("love", "Love", 4),
    ]
    const result = sortGroupedResults(
      groups,
      [{ field: "parent", direction: "asc" }],
      "parent",
      [relationDef],
      relationResolver
    )
    expect(result.map((g) => g.key)).toEqual(["faith", "love", "health", "fun"])
  })

  test("multi-relation groups order by target sortOrder", () => {
    const groups = [group("fun", "Fun", 1), group("health", "Health", 2), group("love", "Love", 3)]
    const result = sortGroupedResults(
      groups,
      [{ field: "related", direction: "asc" }],
      "related",
      [multiRelationDef],
      relationResolver
    )
    expect(result.map((g) => g.key)).toEqual(["love", "health", "fun"])
  })

  test("entries without sortOrder sort after entries with sortOrder", () => {
    const groups = [
      group("misc", "Misc", 1),
      group("fun", "Fun", 2),
      group("bravo", "Bravo", 3),
      group("faith", "Faith", 4),
    ]
    const result = sortGroupedResults(
      groups,
      [{ field: "parent", direction: "asc" }],
      "parent",
      [relationDef],
      relationResolver
    )
    expect(result.map((g) => g.key)).toEqual(["faith", "fun", "bravo", "misc"])
  })

  test("__none__ group sorts first under sortOrder asc ordering (null convention)", () => {
    const groups = [
      group("__none__", "No Value", 1),
      group("fun", "Fun", 2),
      group("love", "Love", 3),
      group("faith", "Faith", 4),
    ]
    const result = sortGroupedResults(
      groups,
      [{ field: "parent", direction: "asc" }],
      "parent",
      [relationDef],
      relationResolver
    )
    expect(result.map((g) => g.key)).toEqual(["__none__", "faith", "love", "fun"])
  })
})

describe("generateGroupSortOptions — relation", () => {
  test("relation includes property name + label + count", () => {
    const opts = generateGroupSortOptions("parent", [relationDef])
    expect(opts).toHaveLength(3)
    expect(opts[0]).toEqual({ value: "parent", label: "Parent", defaultDirection: "asc" })
    expect(opts[1]).toEqual({ value: "label", label: "Label", defaultDirection: "asc" })
    expect(opts[2]).toEqual({ value: "count", label: "Count", defaultDirection: "desc" })
  })

  test("multi-relation includes property name + label + count", () => {
    const opts = generateGroupSortOptions("related", [multiRelationDef])
    expect(opts).toHaveLength(3)
    expect(opts[0]).toEqual({ value: "related", label: "Related", defaultDirection: "asc" })
  })
})

describe("getDefaultGroupSorts — relation", () => {
  test("relation defaults to sorting by groupBy field asc", () => {
    expect(getDefaultGroupSorts("parent", [relationDef])).toEqual([
      { field: "parent", direction: "asc" },
    ])
  })

  test("multi-relation defaults to sorting by groupBy field asc", () => {
    expect(getDefaultGroupSorts("related", [multiRelationDef])).toEqual([
      { field: "related", direction: "asc" },
    ])
  })
})
