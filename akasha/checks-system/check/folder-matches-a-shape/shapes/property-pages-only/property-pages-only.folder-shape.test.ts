import { expect, test } from "bun:test"
import { heldIn } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { propertyPagesOnly } from "./property-pages-only.folder-shape.code.ts"

const FOLDER = "akasha/one/properties"

const PAGE_TYPES = new Set<string>([
  "text-property",
  "relation-property",
  "boolean-property",
  "module",
  "domain",
])

const FILE_PROPERTIES = new Set<string>(["code", "test"])

const EXTENDING = new Set<string>(["text-property", "relation-property", "boolean-property"])

function standing(names: readonly string[]): Standing {
  const held = names.map((each) => heldIn(`${FOLDER}/${each}`, PAGE_TYPES, FILE_PROPERTIES))
  return {
    folder: FOLDER,
    files: held.map((each) => each.path),
    deep: [],
    pages: held.filter((each) => each.kind === "page"),
    properties: held.filter((each) => each.kind === "property"),
    strays: held.filter((each) => each.kind === "stray"),
    entered: () => false,
    extending: (pageTypeSlug, wanted) => wanted === "page-property" && EXTENDING.has(pageTypeSlug),
  }
}

test("a folder holding no file at all takes the shape", () => {
  expect(propertyPagesOnly(standing([]))).toEqual([])
})

test("property pages of several value kinds take the shape, which is the whole point", () => {
  const said = propertyPagesOnly(
    standing([
      "id.text-property.ts",
      "slug.text-property.ts",
      "page-type-slug.relation-property.ts",
    ])
  )
  expect(said).toEqual([])
})

test("property pages of one value kind take the shape too", () => {
  expect(propertyPagesOnly(standing(["runs-on-audit.boolean-property.ts"]))).toEqual([])
})

test("a page whose type does not extend page-property is refused, and the reason names it", () => {
  const said = propertyPagesOnly(standing(["id.text-property.ts", "held.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("does not extend `page-property`")
  expect(said[0]).toContain("held.module.ts")
})

test("a file standing beside a page is refused, because a property page carries no file", () => {
  const said = propertyPagesOnly(standing(["held.module.ts", "held.module.code.ts"]))
  expect(said.some((each) => each.includes("stand beside a page"))).toBe(true)
})

test("a file that is neither a page nor stands beside one is refused", () => {
  const said = propertyPagesOnly(standing(["id.text-property.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})
