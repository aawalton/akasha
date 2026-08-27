import { describe, expect, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import { filterToCondition } from "@shared/pages-core/filter/filter-to-condition"
import { type ViewFilter } from "@shared/pages-core/schema/view-data"
import { type PropertyDefinition } from "@shared/pages-core/types"
import { adjustTotalForClientFilters, applyClientViewFilters } from "./apply-client-view-filters"

const NOTES_DEF: PropertyDefinition = { id: "notes", title: "Notes", type: "rich-document" }
const PATH_DEF: PropertyDefinition = { id: "path", title: "Path", type: "path-select" }
const PROGRESS_DEF: PropertyDefinition = { id: "prog", title: "Progress", type: "progress" }

const emptyBlocks = { blocks: [] }
const blankBlock = { blocks: [{ type: "paragraph", text: "" }] }
const realNotes = { blocks: [{ type: "paragraph", text: "a real note" }] }

function page(id: string, extra: Record<string, unknown>): Page {
  return Page({
    id,
    seq: 1,
    title: id,
    icon: null,
    slug: id,
    userId: "u",
    pageTypeId: "pt",
    pageTypeSlug: "persona",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    uniqueKey: null,
    parentKey: null,
    ...extra,
  })
}

function ids(rows: readonly Page[]): readonly string[] {
  return rows.map((r) => r.id)
}

function filterOne(
  rows: readonly Page[],
  filter: ViewFilter,
  defs: readonly PropertyDefinition[]
): readonly Page[] {
  return applyClientViewFilters(rows, [filter], defs, "pt", undefined)
}

describe("applyClientViewFilters — rich-document emptiness (client-only)", () => {
  const rows = [
    page("real", { notes: realNotes }),
    page("empty", { notes: emptyBlocks }),
    page("blank", { notes: blankBlock }),
    page("absent", {}),
  ]

  test("is_not_empty keeps only the doc with real text (drops empty/blank/absent)", () => {
    const out = filterOne(rows, { propertyId: "notes", operator: "is_not_empty" }, [NOTES_DEF])
    expect(ids(out)).toEqual(["real"])
  })

  test("is_empty is the exact complement", () => {
    const out = filterOne(rows, { propertyId: "notes", operator: "is_empty" }, [NOTES_DEF])
    expect(ids(out)).toEqual(["empty", "blank", "absent"])
  })
})

describe("applyClientViewFilters — path_starts_with (client-only)", () => {
  const rows = [
    page("ab", { path: ["a", "b"] }),
    page("ac", { path: ["a", "c"] }),
    page("x", { path: ["x"] }),
    page("empty", { path: [] }),
  ]

  test("keeps only rows whose path has the given prefix", () => {
    const out = filterOne(
      rows,
      { propertyId: "path", operator: "path_starts_with", value: ["a"] },
      [PATH_DEF]
    )
    expect(ids(out)).toEqual(["ab", "ac"])
  })

  test("a deeper prefix narrows further", () => {
    const out = filterOne(
      rows,
      { propertyId: "path", operator: "path_starts_with", value: ["a", "b"] },
      [PATH_DEF]
    )
    expect(ids(out)).toEqual(["ab"])
  })
})

describe("applyClientViewFilters — progress operators (client-only)", () => {
  const rows = [
    page("done", { prog: { current: 2, total: 2 } }),
    page("half", { prog: { current: 1, total: 2 } }),
    page("zero", { prog: { current: 0, total: 2 } }),
    page("absent", {}),
  ]

  test("is_complete keeps only fully-complete rows", () => {
    const out = filterOne(rows, { propertyId: "prog", operator: "is_complete" }, [PROGRESS_DEF])
    expect(ids(out)).toEqual(["done"])
  })

  test("is_incomplete keeps started-but-not-done rows", () => {
    const out = filterOne(rows, { propertyId: "prog", operator: "is_incomplete" }, [PROGRESS_DEF])
    expect(ids(out)).toEqual(["half", "zero"])
  })

  test("gte_percent keeps rows at or above the threshold", () => {
    const out = filterOne(rows, { propertyId: "prog", operator: "gte_percent", value: 50 }, [
      PROGRESS_DEF,
    ])
    expect(ids(out)).toEqual(["done", "half"])
  })

  test("lte_percent keeps rows at or below the threshold", () => {
    const out = filterOne(rows, { propertyId: "prog", operator: "lte_percent", value: 50 }, [
      PROGRESS_DEF,
    ])
    expect(ids(out)).toEqual(["half", "zero"])
  })
})

describe("applyClientViewFilters — inertness guards", () => {
  const rows = [page("a", { notes: emptyBlocks })]

  test("no filters → rows unchanged (identity)", () => {
    expect(applyClientViewFilters(rows, undefined, [NOTES_DEF], "pt", undefined)).toBe(rows)
    expect(applyClientViewFilters(rows, [], [NOTES_DEF], "pt", undefined)).toBe(rows)
  })

  test("no property defs (defs still streaming) → superset returned, self-corrects later", () => {
    const out = applyClientViewFilters(
      rows,
      [{ propertyId: "notes", operator: "is_not_empty" }],
      undefined,
      "pt",
      undefined
    )
    expect(out).toBe(rows)
  })
})

describe("adjustTotalForClientFilters", () => {
  test("subtracts client-dropped rows from the server total", () => {
    expect(adjustTotalForClientFilters(10, 10, 4)).toBe(4)
  })

  test("no drops → server total is preserved (counts do not regress)", () => {
    expect(adjustTotalForClientFilters(1000, 50, 50)).toBe(1000)
  })

  test("over-cap set → server total minus resident drops, never an overcount", () => {
    expect(adjustTotalForClientFilters(12000, 10000, 7000)).toBe(9000)
  })

  test("null server total stays null", () => {
    expect(adjustTotalForClientFilters(null, 10, 4)).toBeNull()
  })

  test("never returns below zero", () => {
    expect(adjustTotalForClientFilters(2, 10, 4)).toBe(0)
  })
})

describe("an operator the server cannot narrow is one the client decides", () => {
  const CLIENT_ONLY = [
    ["is_complete", PROGRESS_DEF, null],
    ["is_incomplete", PROGRESS_DEF, null],
    ["gte_percent", PROGRESS_DEF, 75],
    ["lte_percent", PROGRESS_DEF, 50],
    ["path_starts_with", PATH_DEF, ["combat"]],
    ["is_empty", NOTES_DEF, null],
    ["is_not_empty", NOTES_DEF, null],
  ] as const

  test.each(CLIENT_ONLY)("`%s` yields no server narrow", (operator, def, value) => {
    expect(filterToCondition(def.id, operator, value, def.type)).toBeNull()
  })

  test.each(
    CLIENT_ONLY
  )("`%s` still decides the rows, so the dropped narrow widens nothing", (operator, def, value) => {
    const rows = [
      page("done", { prog: { current: 2, total: 2 }, path: ["combat", "light"], notes: realNotes }),
      page("half", { prog: { current: 1, total: 2 }, path: ["crafting"], notes: emptyBlocks }),
    ]
    const kept = filterOne(rows, { propertyId: def.id, operator, value }, [def])
    expect(kept.length).toBeLessThan(rows.length)
  })

  test("an operator with no translator and no client predicate is refused by the reader that owns it", () => {
    expect(filterToCondition("prog", "no_such_operator", null, "progress")).toBeNull()
  })
})
