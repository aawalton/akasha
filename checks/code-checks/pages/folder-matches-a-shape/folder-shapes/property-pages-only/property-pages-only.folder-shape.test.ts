import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import { propertyPagesOnly } from "./property-pages-only.folder-shape.code.ts"

const FOLDER = "akasha/one/properties"

const OTHER = "akasha/one/props"

const PAGE_TYPES = new Set<string>([
  "text-property",
  "relation-property",
  "boolean-property",
  "module",
  "domain",
])

const EXTENDING = new Set<string>(["text-property", "relation-property", "boolean-property"])

const folder = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  extending: (pageTypeSlug, wanted) => wanted === "page-property" && EXTENDING.has(pageTypeSlug),
})

const otherwise = folderFrom({
  folder: OTHER,
  pageTypes: PAGE_TYPES,
  extending: (pageTypeSlug, wanted) => wanted === "page-property" && EXTENDING.has(pageTypeSlug),
})

test("a folder holding no file at all takes the shape", () => {
  expect(propertyPagesOnly(folder([]))).toEqual([])
})

test("property pages of several value kinds take the shape, which is the whole point", () => {
  const said = propertyPagesOnly(
    folder(["id.text-property.ts", "slug.text-property.ts", "page-type-slug.relation-property.ts"])
  )
  expect(said).toEqual([])
})

test("property pages of one value kind take the shape too", () => {
  expect(propertyPagesOnly(folder(["runs-on-audit.boolean-property.ts"]))).toEqual([])
})

test("a page whose type does not extend page-property is refused, and the reason names it", () => {
  const said = propertyPagesOnly(folder(["id.text-property.ts", "held.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("does not extend `page-property`")
  expect(said[0]).toContain("held.module.ts")
})

test("a file beside a page is refused, because a property page carries no file", () => {
  const said = propertyPagesOnly(folder(["held.module.ts", "held.module.code.ts"]))
  expect(said.some((each) => each.includes("sit beside a page"))).toBe(true)
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = propertyPagesOnly(folder(["id.text-property.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("a folder of property pages under any other name is refused, and the reason names both", () => {
  const said = propertyPagesOnly(otherwise(["id.text-property.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`props`")
  expect(said[0]).toContain("`properties`")
})

test("a folder holding no file at all is refused under any other name", () => {
  const said = propertyPagesOnly(otherwise([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`props`")
  expect(said[0]).toContain("`properties`")
})
