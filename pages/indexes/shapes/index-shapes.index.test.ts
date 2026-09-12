import { expect, test } from "bun:test"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import {
  carriedOfType,
  carryingIn,
  fileFor,
  pageTypeSlugsIn,
  shapedIn,
  shapeFiled,
  shapeFileFor,
  shapesFiled,
  shapesIn,
} from "akasha/pages/indexes/shapes/index-shapes.index.code.ts"
import { sourceOver } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

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

const ABOVE: Value = {
  type: "page-type",
  slug: "above",
  properties: [{ pageProperty: "text-property/slug", required: true, many: false }],
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

const VALUES: readonly Value[] = [SLUG, CODE, HOLDER, ABOVE, BELOW]

function filed(): readonly Entry[] {
  return shapesFiled(sourceOver([...VALUES]), shapesIn(VALUES), pageTypeSlugsIn(VALUES))
}

function carriedBy(pageTypeSlug: string): readonly NonNullable<ReturnType<typeof carryingIn>>[] {
  return filed()
    .filter((one) => one.at === fileFor(pageTypeSlug))
    .map((one) => carryingIn(one.line))
    .filter((one) => one !== null)
}

test("a page type names the one file the properties it carries are filed in", () => {
  expect(fileFor("below")).toBe("shapes/page-type/below.jsonl")
  expect(fileFor("page")).toBe("shapes/page-type/page.jsonl")
})

test("only the page types among the values are filed", () => {
  expect(pageTypeSlugsIn(VALUES)).toEqual(["above", "below"])
})

test("a page type carries what it declares and what every page type above it declares", () => {
  expect(
    carriedBy("below")
      .map((one) => one.key)
      .sort()
  ).toEqual(["code", "holder", "slug"])
})

test("a line says which page type declared the property", () => {
  const held = carriedBy("below")
  expect(held.find((one) => one.key === "slug")?.declaredBy).toBe("above")
  expect(held.find((one) => one.key === "code")?.declaredBy).toBe("below")
})

test("a line carries what the property's own page says, so no second page is read", () => {
  const held = carriedBy("below")
  expect(held.find((one) => one.key === "code")?.fileName).toBe("code")
  expect(held.find((one) => one.key === "holder")?.targetPageTypeSlug).toBe("person")
  expect(held.find((one) => one.key === "slug")?.unique).toBe("page-type")
})

test("a line carries what the declaration itself says", () => {
  const held = carriedBy("below")
  expect(held.find((one) => one.key === "slug")?.required).toBe(true)
  expect(held.find((one) => one.key === "holder")?.many).toBe(true)
  expect(held.find((one) => one.key === "holder")?.maxCount).toBe(3)
  expect(held.find((one) => one.key === "code")?.required).toBe(false)
})

test("a page type above is filed with its own properties alone", () => {
  expect(carriedBy("above").map((one) => one.key)).toEqual(["slug"])
})

test("a page type naming a page type that is not there has no file", () => {
  const stray: Value = { type: "page-type", slug: "stray", extends: ["page-type/gone"] }
  const held = [...VALUES, stray]
  const said = shapesFiled(sourceOver(held), shapesIn(held), pageTypeSlugsIn(held))
  expect(said.some((one) => one.at === fileFor("stray"))).toBe(false)
})

function readingOf(asked: string[]): Reading {
  const held = new Map<string, string[]>()
  for (const one of filed()) held.set(one.at, [...(held.get(one.at) ?? []), one.line])
  return {
    holds: () => true,
    listing: () => [],
    lines: (at) => {
      asked.push(at)
      return held.get(at) ?? []
    },
    read: () => null,
  }
}

test("what a page type carries is answered by reading the one file it is filed in", () => {
  const asked: string[] = []
  const reading = readingOf(asked)

  expect(
    carriedOfType(reading, "below")
      .map((one) => one.key)
      .sort()
  ).toEqual(["code", "holder", "slug"])
  expect(asked).toEqual([fileFor("below")])
})

test("a page type with no file carries nothing rather than refusing", () => {
  expect(carriedOfType(readingOf([]), "gone")).toEqual([])
})

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

test("a line that is not a filed property is read as none rather than throwing", () => {
  expect(carryingIn("not json")).toBe(null)
  expect(carryingIn("[]")).toBe(null)
  expect(carryingIn("null")).toBe(null)
  expect(carryingIn(JSON.stringify({ key: 3 }))).toBe(null)
  expect(carryingIn(JSON.stringify({ key: "a", propertySlug: "b" }))).toBe(null)
})
