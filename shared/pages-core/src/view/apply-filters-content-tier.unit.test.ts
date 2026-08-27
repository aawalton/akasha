import { describe, expect, test } from "bun:test"
import { NON_EMPTY_CONTENT_KEYS_ATTR } from "../schema/content-tier"
import type { PropertyDefinition } from "../types"
import { applyFilters, testFilter } from "./apply-filters"

const contentDef: PropertyDefinition = {
  id: "notes",
  title: "Notes",
  type: "rich-document",
  storage: "content",
}

const withNotes = { title: "a", [NON_EMPTY_CONTENT_KEYS_ATTR]: ["notes"] }
const withoutNotes = { title: "b", [NON_EMPTY_CONTENT_KEYS_ATTR]: [] }
const noAttr = { title: "c" }

describe("applyFilters — content-tier is_empty/is_not_empty via presence membership", () => {
  test("is_not_empty keeps only rows whose nonEmptyContentKeys contains the key", () => {
    const filtered = applyFilters(
      [withNotes, withoutNotes, noAttr],
      [{ propertyId: "notes", operator: "is_not_empty" }],
      [contentDef]
    )
    expect(filtered.map((r) => r.title)).toEqual(["a"])
  })

  test("is_empty keeps only rows whose nonEmptyContentKeys omits the key", () => {
    const filtered = applyFilters(
      [withNotes, withoutNotes, noAttr],
      [{ propertyId: "notes", operator: "is_empty" }],
      [contentDef]
    )
    expect(filtered.map((r) => r.title)).toEqual(["b", "c"])
  })

  test("a non-empty/empty content operator stays deferred (row-passes no-op)", () => {
    const filtered = applyFilters(
      [withNotes, withoutNotes, noAttr],
      [{ propertyId: "notes", operator: "contains", value: "x" }],
      [contentDef]
    )
    expect(filtered.length).toBe(3)
  })

  test("testFilter on a content-tier property still defers (scalar variant, no row)", () => {
    expect(testFilter(null, { propertyId: "notes", operator: "is_not_empty" }, [contentDef])).toBe(
      true
    )
  })

  test("an indexed sibling filter ANDs with the content presence filter", () => {
    const items = [
      { title: "a", tag: "keep", [NON_EMPTY_CONTENT_KEYS_ATTR]: ["notes"] },
      { title: "b", tag: "drop", [NON_EMPTY_CONTENT_KEYS_ATTR]: ["notes"] },
      { title: "c", tag: "keep", [NON_EMPTY_CONTENT_KEYS_ATTR]: [] },
    ]
    const filtered = applyFilters(
      items,
      [
        { propertyId: "notes", operator: "is_not_empty" },
        { propertyId: "tag", operator: "equals", value: "keep" },
      ],
      [contentDef, { id: "tag", title: "Tag", type: "text" }]
    )
    expect(filtered.map((r) => r.title)).toEqual(["a"])
  })
})
