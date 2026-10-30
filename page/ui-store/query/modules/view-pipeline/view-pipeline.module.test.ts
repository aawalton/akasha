import { expect, test } from "bun:test"
import type { PageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { kindsUnder } from "akasha/page/ui-store/query/modules/view-pipeline/view-pipeline.module.code.ts"

function typeRow(id: string, slug: string, above: readonly string[]): PageRow {
  const row: Record<string, unknown> = {
    id,
    slug,
    page_type_slug: "page-type",
    attributes: { extends: above.map((one) => `page-type/${one}`) },
  }
  return row as PageRow
}

const TYPES: readonly PageRow[] = [
  typeRow("t-page", "page", []),
  typeRow("t-collection", "collection", ["page"]),
  typeRow("t-external", "collection-external", ["collection"]),
  typeRow("t-show", "show", ["collection-external"]),
  typeRow("t-person", "person", ["page"]),
]

test("a view of a page type holds every page type its chain of extends reaches", () => {
  expect([...kindsUnder(TYPES, "t-collection")].sort()).toEqual([
    "t-collection",
    "t-external",
    "t-show",
  ])
})

test("a page type nothing extends holds itself alone", () => {
  expect([...kindsUnder(TYPES, "t-show")]).toEqual(["t-show"])
})

test("a page type no row names still holds itself", () => {
  expect([...kindsUnder([], "t-anything")]).toEqual(["t-anything"])
})
