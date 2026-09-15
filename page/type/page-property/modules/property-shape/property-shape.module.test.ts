import { expect, test } from "bun:test"
import {
  bodyOf,
  shapeAt,
  shapedIn,
  shapeIn,
} from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const AT = "one/two/three.relation-property.ts"

const PAGE = {
  type: "relation-property",
  slug: "seat-persona",
  propertySlug: "persona",
  targetPageType: "page-type/persona",
}

test("the shape sits beside the page under the property slug", () => {
  expect(shapeAt(AT)).toBe("one/two/three.relation-property.shape.jsonl")
})

test("a path that is no TypeScript file has no shape beside it", () => {
  expect(shapeAt("one/two/three.relation-property.shape.jsonl")).toBeNull()
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
    sorted: false,
  })
})

test("a page stating no property slug has no shape", () => {
  expect(shapedIn({ type: "relation-property", slug: "seat-persona" })).toBeNull()
})

test("a shape written here is the shape read back here", () => {
  const one = shapedIn(PAGE)
  expect(one).not.toBeNull()
  if (one === null) return
  expect(shapeIn(bodyOf(one).trim())).toEqual(one)
})

test("a body closes with a newline", () => {
  const one = shapedIn(PAGE)
  expect(one).not.toBeNull()
  if (one === null) return
  expect(bodyOf(one).endsWith("\n")).toBe(true)
})

test("a line that is no JSON reads as no shape", () => {
  expect(shapeIn("{")).toBeNull()
})

test("a line naming no property slug reads as no shape", () => {
  expect(shapeIn(JSON.stringify({ pageTypeSlug: "relation-property", slug: "x" }))).toBeNull()
})
