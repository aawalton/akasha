import { expect, test } from "bun:test"
import { shapeFiled, shapeFileFor } from "akasha/page/index/shapes/index-shapes.index.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { shapedIn } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const SLUG: Value = {
  type: "text-property",
  slug: "slug",
  propertySlug: "slug",
  unique: "page-type",
  maxLength: 100,
}

const CODE: Value = {
  type: "code-file-property",
  slug: "code",
  propertySlug: "code",
  fileName: "code",
}

const HOLDER: Value = {
  type: "relation-property",
  slug: "holder",
  propertySlug: "holder",
  targetPageType: "page-type/person",
}

const BELOW: Value = {
  type: "page-type",
  slug: "below",
  extends: ["page-type/above"],
  properties: [
    { pageProperty: "code-file-property/code", required: false, many: false },
    { pageProperty: "relation-property/holder", required: false, many: true, maxCount: 3 },
  ],
}

test("a page property names the one file its own shape is filed in", () => {
  expect(shapeFileFor("text-property")).toBe("shapes/page-property/text-property.jsonl")
})

test("a page property is filed under the page type it is", () => {
  expect(shapeFiled(HOLDER)).toEqual([
    { at: shapeFileFor("relation-property"), line: JSON.stringify(shapedIn(HOLDER)) },
  ])
})

test("a page stating no property slug is filed nowhere", () => {
  expect(shapeFiled(BELOW)).toEqual([])
})

test("a shape says what the property's own page says", () => {
  const one = shapedIn(SLUG)
  expect(one?.unique).toBe("page-type")
  expect(one?.propertySlug).toBe("slug")
  expect(one?.sorted).toBe(false)
  expect(shapedIn(HOLDER)?.targetPageTypeSlug).toBe("person")
  expect(shapedIn(CODE)?.fileName).toBe("code")
})
