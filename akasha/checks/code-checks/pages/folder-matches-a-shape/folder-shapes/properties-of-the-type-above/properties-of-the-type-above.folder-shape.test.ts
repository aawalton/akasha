import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Declaring, Standing } from "../folder-shape.page-type.ts"
import { propertiesOfTheTypeAbove } from "./properties-of-the-type-above.folder-shape.code.ts"

const ABOVE = "akasha/domains"

const FOLDER = `${ABOVE}/properties`

const PAGE_TYPES = new Set<string>([
  "page-type",
  "text-property",
  "relation-property",
  "record-property",
  "module",
])

const EXTENDING = new Set<string>(["text-property", "relation-property", "record-property"])

const DOMAIN: Declaring = {
  slug: "domain",
  pluralSlug: "domains",
  propertySlugs: new Set<string>(["definition", "invariants", "invariant-kind", "statement"]),
}

function over(folder: string, above: Declaring | null): (names: readonly string[]) => Standing {
  return folderFrom({
    folder,
    pageTypes: PAGE_TYPES,
    extending: (pageTypeSlug, wanted) => wanted === "page-property" && EXTENDING.has(pageTypeSlug),
    declaring: (at) => (at === ABOVE ? above : null),
  })
}

const folder = over(FOLDER, DOMAIN)

test("a folder holding no file at all takes the shape", () => {
  expect(propertiesOfTheTypeAbove(folder([]))).toEqual([])
})

test("the properties that page type declares take the shape", () => {
  const said = propertiesOfTheTypeAbove(
    folder(["definition.text-property.ts", "invariants.record-property.ts"])
  )
  expect(said).toEqual([])
})

test("a field of a record property beside it is declared, so it takes the shape too", () => {
  const said = propertiesOfTheTypeAbove(
    folder(["invariants.record-property.ts", "invariant-kind.relation-property.ts"])
  )
  expect(said).toEqual([])
})

test("a property that page type declares nowhere is refused, and the reason names it", () => {
  const said = propertiesOfTheTypeAbove(
    folder(["definition.text-property.ts", "loose.text-property.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("declares nowhere")
  expect(said[0]).toContain("loose.text-property.ts")
})

test("a page whose type does not extend page-property is refused, and the reason names it", () => {
  const said = propertiesOfTheTypeAbove(folder(["definition.text-property.ts", "held.module.ts"]))
  expect(said.some((each) => each.includes("does not extend `page-property`"))).toBe(true)
})

test("a file beside a page is refused, because a property page carries no file", () => {
  const said = propertiesOfTheTypeAbove(folder(["held.module.ts", "held.module.code.ts"]))
  expect(said.some((each) => each.includes("sit beside a page"))).toBe(true)
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = propertiesOfTheTypeAbove(folder(["definition.text-property.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const held = over(`${ABOVE}/props`, DOMAIN)
  const said = propertiesOfTheTypeAbove(held(["definition.text-property.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`props`")
  expect(said[0]).toContain("`properties`")
})

test("a folder named properties above which no page type sits is refused", () => {
  const held = over(FOLDER, null)
  expect(propertiesOfTheTypeAbove(held([]))).toEqual([
    "the folder above holds no page type of its own",
  ])
})
