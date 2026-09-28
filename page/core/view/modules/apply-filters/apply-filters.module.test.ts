import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ViewFilter } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { applyFilters } from "akasha/page/core/view/modules/apply-filters/apply-filters.module.code.ts"

const DEFINED: readonly PropertyDefinition[] = [
  { id: "ownRemaining", title: "Own Remaining", type: "number" },
  { id: "story", title: "Story", type: "relation" },
  { id: "prose", title: "Prose", type: "text", storage: "content" },
  {
    id: "origin",
    title: "Origin",
    type: "json",
    fields: [{ id: "source", title: "Source", type: "text" }],
  },
]

const ROWS = [
  { title: "Left", ownRemaining: 3, origin: { source: "royal-road" } },
  { title: "Done", ownRemaining: 0, origin: { source: "elsewhere" } },
]

test("a filter on a declared property keeps the pages passing it", () => {
  const filters = [{ propertyId: "ownRemaining", operator: "gte", value: 1 }]
  expect(applyFilters(ROWS, filters, DEFINED).map((one) => one.title)).toEqual(["Left"])
})

test("a filter on a key the page type does not declare is refused rather than passed over", () => {
  const filters = [{ propertyId: "following", operator: "equals", value: true }]
  expect(() => applyFilters(ROWS, filters, DEFINED)).toThrow("declares nothing for")
})

test("a filter reaching a field inside a record keeps the pages whose field passes it", () => {
  const filters = [{ propertyId: "origin.source", operator: "equals", value: "royal-road" }]
  expect(applyFilters(ROWS, filters, DEFINED).map((one) => one.title)).toEqual(["Left"])
})

function filtering(filter: ViewFilter): () => unknown {
  return () => applyFilters(ROWS, [filter], DEFINED)
}

test("a filter naming a field a record does not hold is refused", () => {
  const refused = filtering({ propertyId: "origin.author", operator: "equals", value: "x" })
  expect(refused).toThrow("holds no such field")
})

test("a filter reaching through a relation is refused here", () => {
  const refused = filtering({ propertyId: "story.following", operator: "equals", value: true })
  expect(refused).toThrow("reaches through the relation `story`")
})

test("content is tested for emptiness and refused any other test", () => {
  expect(filtering({ propertyId: "prose", operator: "is_empty" })).not.toThrow()
  expect(filtering({ propertyId: "prose", operator: "contains", value: "x" })).toThrow(
    "held as content"
  )
})

test("pages are left whole while the page type's properties are unread", () => {
  const filters = [{ propertyId: "following", operator: "equals", value: true }]
  expect(applyFilters(ROWS, filters, [])).toEqual(ROWS)
})
