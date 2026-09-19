import { expect, test } from "bun:test"
import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import {
  bodyOf,
  carriedOf,
  carryingEach,
  carryingIn,
  carryingOf,
  schemaAt,
} from "akasha/page/type/modules/type-schema/type-schema.module.code.ts"

const HOLDER: Carried = {
  key: "holder",
  propertySlug: "holder",
  pagePropertySlug: "holder",
  pageTypeSlug: "relation-property",
  declaredBy: "below",
  required: false,
  many: true,
  unique: null,
  maxCount: 3,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const SLUG: Carried = {
  key: "slug",
  propertySlug: "slug",
  pagePropertySlug: "slug",
  pageTypeSlug: "text-property",
  declaredBy: "above",
  required: true,
  many: false,
  unique: "page-type",
  maxCount: null,
  maxLength: 100,
  uncommitted: false,
  secret: false,
}

const SHAPE: Shape = {
  pageTypeSlug: "relation-property",
  targetPageTypeSlug: "person",
  unique: null,
  uniquePropertySlug: null,
  slug: "holder",
  propertySlug: "holder",
  fileName: null,
  folderName: null,
}

const SHAPES = new Map([["relation-property/holder", SHAPE]])

test("what a page type carries sits beside that page type under the property slug", () => {
  expect(schemaAt("one/two/three.page-type.ts")).toBe("one/two/three.page-type.schema.jsonl")
})

test("a path that is no TypeScript file has nothing beside it", () => {
  expect(schemaAt("one/two/three.page-type.schema.jsonl")).toBeNull()
})

test("a line carries what the property's own page says", () => {
  const one = carryingOf(HOLDER, { ...SHAPE, targetPageTypeSlug: "persona" })
  expect(one.targetPageTypeSlug).toBe("persona")
  expect(one.fileName).toBeNull()
})

test("a property the shapes do not name carries nothing of that property's own page", () => {
  const one = carryingOf(SLUG, undefined)
  expect(one.targetPageTypeSlug).toBeNull()
  expect(one.fileName).toBeNull()
})

test("a line carries what the declaration says", () => {
  const one = carryingOf(HOLDER, SHAPE)
  expect(one.many).toBe(true)
  expect(one.maxCount).toBe(3)
  expect(one.declaredBy).toBe("below")
})

test("a line written here is the line read back here", () => {
  const one = carryingOf(HOLDER, SHAPE)
  expect(carryingIn(JSON.stringify(one))).toEqual(one)
})

test("a line read back is a property the page type carries", () => {
  const one = carriedOf(carryingOf(SLUG, undefined))
  expect(one.key).toBe("slug")
  expect(one.unique).toBe("page-type")
  expect(one.uniquePropertySlug).toBeUndefined()
  expect(one.fixed).toBeUndefined()
})

test("a page type carrying nothing has a body with no line", () => {
  expect(bodyOf([], SHAPES)).toBe("")
})

test("the lines are sorted and the body closes with a newline", () => {
  const body = bodyOf([HOLDER, SLUG], SHAPES)
  const lines = body.trimEnd().split("\n")
  expect(body.endsWith("\n")).toBe(true)
  expect(lines).toEqual([...lines].sort())
  expect(carryingEach(lines).map((one) => one.key)).toEqual(["holder", "slug"])
})

test("a line that is not a carried property reads as none rather than throwing", () => {
  expect(carryingIn("not json")).toBeNull()
  expect(carryingIn("[]")).toBeNull()
  expect(carryingIn("null")).toBeNull()
  expect(carryingIn(JSON.stringify({ key: "a", propertySlug: "b" }))).toBeNull()
})
