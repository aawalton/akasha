import { expect, test } from "bun:test"
import {
  bodyOf,
  shapedIn,
  shapeIn,
  shapesFiledAt,
  shapesIn,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { persona } from "akasha/persona/persona.page-type.ts"

const AT = "one/two/three.page-type.ts"

const PAGE = {
  type: "relation-property",
  slug: "seat-persona",
  propertySlug: "persona",
  targetPageType: `${pageType.slug}/${persona.slug}`,
}

test("the shapes sit beside the page type they are of", () => {
  expect(shapesFiledAt(AT)).toBe("one/two/three.page-type.shapes.jsonl")
})

test("a path that is no TypeScript file has no shapes beside it", () => {
  expect(shapesFiledAt("one/two/three.page-type.shapes.jsonl")).toBeNull()
})

test("a page property's shape is read off its own value", () => {
  expect(shapedIn(PAGE)).toEqual({
    pageTypeSlug: "relation-property",
    targetPageTypeSlug: "persona",
    unique: null,
    uniquePropertySlug: null,
    slug: "seat-persona",
    propertySlug: "persona",
    fileName: null,
    folderName: null,
  })
})

test("a page stating no property slug has no shape", () => {
  expect(shapedIn({ type: "relation-property", slug: "seat-persona" })).toBeNull()
})

test("a shape written here is the shape read back here", () => {
  const one = shapedIn(PAGE)
  expect(one).not.toBeNull()
  if (one === null) return
  expect(shapesIn(bodyOf([one]))).toEqual([one])
})

test("a body closes with a newline", () => {
  const one = shapedIn(PAGE)
  expect(one).not.toBeNull()
  if (one === null) return
  expect(bodyOf([one]).endsWith("\n")).toBe(true)
})

test("a body holding no shape is empty", () => {
  expect(bodyOf([])).toBe("")
})

test("a body holds the shapes in the order their slugs sort in", () => {
  const one = shapedIn(PAGE)
  const two = shapedIn({ ...PAGE, slug: "a-persona" })
  expect(one).not.toBeNull()
  expect(two).not.toBeNull()
  if (one === null || two === null) return
  expect(shapesIn(bodyOf([one, two])).map((held) => held.slug)).toEqual(["a-persona", one.slug])
})

test("a line that reads as no shape is passed over", () => {
  const one = shapedIn(PAGE)
  expect(one).not.toBeNull()
  if (one === null) return
  expect(shapesIn(`{\n${JSON.stringify(one)}\n`)).toEqual([one])
})

test("a line that is no JSON reads as no shape", () => {
  expect(shapeIn("{")).toBeNull()
})

test("a line naming no property slug reads as no shape", () => {
  expect(shapeIn(JSON.stringify({ pageTypeSlug: "relation-property", slug: "x" }))).toBeNull()
})
