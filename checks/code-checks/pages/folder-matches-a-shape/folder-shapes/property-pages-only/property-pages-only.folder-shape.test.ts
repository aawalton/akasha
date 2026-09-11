import { expect, test } from "bun:test"
import { folderFrom } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import { propertyPagesOnly } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/property-pages-only/property-pages-only.folder-shape.code.ts"

const FOLDER = "akasha/one/properties"

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

const TYPE_BESIDE = `${FOLDER}/parts.relation-property.types.ts`

const carrying = folderFrom({
  folder: FOLDER,
  pageTypes: PAGE_TYPES,
  fileProperties: new Set<string>(["code", "test", "types"]),
  extending: (pageTypeSlug, wanted) => wanted === "page-property" && EXTENDING.has(pageTypeSlug),
  parts: (page) => [page.path, TYPE_BESIDE],
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

test("a property page's own generated type beside it takes the shape", () => {
  const said = propertyPagesOnly(
    carrying(["parts.relation-property.ts", "parts.relation-property.types.ts"])
  )
  expect(said).toEqual([])
})

test("a file no page in the folder states is refused, and the reason names it", () => {
  const said = propertyPagesOnly(folder(["held.module.ts", "held.module.code.ts"]))
  expect(said.some((each) => each.includes("states no such file"))).toBe(true)
  expect(said.some((each) => each.includes("held.module.code.ts"))).toBe(true)
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = propertyPagesOnly(folder(["id.text-property.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})
