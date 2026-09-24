import { afterAll, expect, test } from "bun:test"
import {
  pageTypeRows,
  typeRowsFrom,
} from "akasha/alan/harness/code-editor/data-interface/modules/page-type-rows/page-type-rows.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import type { Valued } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  aType,
  bodyOf,
  graphedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

const TYPES: readonly Valued[] = [
  { path: "one/thing.page-type.ts", value: { slug: "thing", extends: [PAGE_AT] } },
  { path: "one/page.page-type.ts", value: { slug: "page", extends: [] } },
]

const ABOVE_TWO: readonly Valued[] = [
  {
    path: "one/held.page-type.ts",
    value: { slug: "held", extends: [MODULE_AT, PAGE_PROPERTY_AT] },
  },
  { path: "one/module.page-type.ts", value: { slug: "module", extends: [PAGE_AT] } },
  { path: "one/page.page-type.ts", value: { slug: "page", extends: [] } },
]

test("a page type is answered with the type above it, and a type with none above names none", () => {
  expect(typeRowsFrom(TYPES)).toEqual([
    { at: "akasha:one/thing.page-type.ts", values: { slug: "thing", "extends-slug": "page" } },
    { at: "akasha:one/page.page-type.ts", values: { slug: "page", "extends-slug": null } },
  ])
})

test("a row carries the checkout ahead of the path inside it", () => {
  for (const row of typeRowsFrom(TYPES)) {
    expect(row.at.startsWith("akasha:")).toBe(true)
  }
})

test("a row carries the keys the editor reads and nothing it would drop", () => {
  const said = JSON.parse(JSON.stringify(typeRowsFrom(TYPES)))

  expect(Object.keys(said[0])).toEqual(["at", "values"])
  expect(Object.keys(said[0].values)).toEqual(["slug", "extends-slug"])
})

test("a page without a slug is answered on no row", () => {
  expect(typeRowsFrom([{ path: "one/blank.page-type.ts", value: { extends: [] } }])).toEqual([])
})

test("a page type naming two types above it is answered on one row for each", () => {
  expect(typeRowsFrom(ABOVE_TWO)).toEqual([
    { at: "akasha:one/held.page-type.ts", values: { slug: "held", "extends-slug": "module" } },
    {
      at: "akasha:one/held.page-type.ts",
      values: { slug: "held", "extends-slug": "page-property" },
    },
    { at: "akasha:one/module.page-type.ts", values: { slug: "module", "extends-slug": "page" } },
    { at: "akasha:one/page.page-type.ts", values: { slug: "page", "extends-slug": null } },
  ])
})

test("the rows are read from the index of a repository", () => {
  const [at, value] = aType("01a04a4a-0007-7000-8000-000000000001", "rows-held", [
    MODULE_AT,
    PAGE_AT,
  ])
  const rows = pageTypeRows(graphedRepo({ [`akasha/${at}`]: bodyOf(value) }))

  expect(
    rows
      .filter((one) => one.values["slug"] === "rows-held")
      .map((one) => one.values["extends-slug"])
  ).toEqual(["module", "page"])
})
