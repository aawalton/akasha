import { expect, test } from "bun:test"
import type { Value } from "../../../pages-system/index/index-entries.module.code.ts"
import type { Matching } from "../../../pages-system/name-format/name-matching.module.code.ts"
import {
  declaredFor,
  type Formatting,
  reasonsIn,
  type Reading,
  slugOf,
} from "./page-matches-its-type.check.code.ts"

const FORMAT = "all-lower"

const TYPES: Record<string, Value> = {
  page: {
    pageTypeSlug: "page-type",
    slug: "page",
    extendsSlug: null,
    properties: [
      { pagePropertySlug: "id", required: true, many: false },
      { pagePropertySlug: "slug", required: true, many: false },
    ],
  },
  module: {
    pageTypeSlug: "page-type",
    slug: "module",
    extendsSlug: "page-type/page",
    properties: [{ pagePropertySlug: "test", required: false, many: false }],
  },
  check: {
    pageTypeSlug: "page-type",
    slug: "check",
    extendsSlug: "page-type/module",
    properties: [
      { pagePropertySlug: "test", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 2, total: 6 },
    ],
  },
  told: {
    pageTypeSlug: "page-type",
    slug: "told",
    extendsSlug: "page-type/page",
    properties: [
      { pagePropertySlug: "directives", required: false, many: true, max: null },
      { pagePropertySlug: "aids", required: false, many: true, max: null },
    ],
  },
  looping: {
    pageTypeSlug: "page-type",
    slug: "looping",
    extendsSlug: "page-type/looping",
    properties: [{ pagePropertySlug: "id", required: false, many: false }],
  },
}

const PROPERTIES: Record<string, Value> = {
  id: { pageTypeSlug: "text-property", slug: "id", max: 36 },
  slug: { pageTypeSlug: "text-property", slug: "slug", max: 8, nameFormatSlug: FORMAT },
  test: { pageTypeSlug: "text-property", slug: "test", max: 4 },
  aids: { pageTypeSlug: "text-property", slug: "aids", max: 5 },
  name: { pageTypeSlug: "text-property", slug: "name", max: 8, nameFormatSlug: FORMAT },
  directives: {
    pageTypeSlug: "record-property",
    slug: "directives",
    properties: [
      { pagePropertySlug: "name", required: true, many: false },
      { pagePropertySlug: "aids", required: false, many: true, max: 3, total: 6 },
    ],
  },
}

const read: Reading = (pageTypeSlug, slug) =>
  pageTypeSlug === "page-type" ? (TYPES[slug] ?? null) : null

const property = (slug: string): Value | null => PROPERTIES[slug] ?? null

function allLower(name: string): boolean {
  return name === name.toLowerCase()
}

function formatting(nameFormatSlug: string): Matching {
  if (nameFormatSlug !== FORMAT) {
    throw new Error(`no name format carries the slug \`${nameFormatSlug}\``)
  }
  return allLower
}

function over(value: Value, pageTypeSlug: string): readonly string[] {
  return reasonsIn(
    value,
    declaredFor(pageTypeSlug, read),
    property,
    `page-type/${pageTypeSlug}`,
    formatting
  )
}

test("a slug is taken off a qualified address and an id answers nothing", () => {
  expect(slugOf("page-type/page")).toBe("page")
  expect(slugOf("page")).toBe("page")
  expect(slugOf("01a04e92-bfba-7ca8-b12b-37b6a6a4c408")).toBe(null)
})

test("the chain is walked and the nearest declaration binds", () => {
  const declared = declaredFor("check", read)
  expect([...declared.keys()].sort()).toEqual(["aids", "id", "slug", "test"])
  expect(declared.get("test")?.required).toBe(true)
  expect(declared.get("id")?.required).toBe(true)
})

test("a cycle in the chain is walked once and does not hang", () => {
  expect([...declaredFor("looping", read).keys()]).toEqual(["id"])
})

test("a page carrying what its type declares raises nothing", () => {
  expect(over({ id: "a", slug: "one", test: "ts" }, "check")).toEqual([])
})

test("a required property the page does not state is refused", () => {
  expect(over({ id: "a", slug: "one" }, "check")).toEqual([
    "does not state `test`, which `page-type/check` requires",
  ])
})

test("a property the page type does not declare is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", extra: 1 }, "check")).toEqual([
    "states `extra`, which `page-type/check` does not declare",
  ])
})

test("a value over its text max is refused", () => {
  expect(over({ id: "a", slug: "far-too-long", test: "ts" }, "check")).toEqual([
    "`slug` runs to 12 characters, over the max of 8",
  ])
})

test("a list over the max its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "y", "z"] }, "check")).toEqual([
    "holds 3 of `aids`, over the max of 2",
  ])
})

test("a list over the total its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["hello", "world"] }, "check")).toEqual([
    "holds 10 characters of `aids`, over the total of 6",
  ])
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["ab", "cd"] }, "check")).toEqual([])
})

test("a declaration stating no total lets a list run to any length", () => {
  expect(over({ id: "a", slug: "one", aids: ["hello", "world"] }, "told")).toEqual([])
})

test("a record field over the total its declaration states is refused", () => {
  const over_ = { id: "a", slug: "one", directives: [{ name: "go", aids: ["hello", "world"] }] }
  expect(over(over_, "told")).toEqual([
    "holds 10 characters of `directives aids`, over the total of 6",
  ])
  const under = { id: "a", slug: "one", directives: [{ name: "go", aids: ["ab", "cd"] }] }
  expect(over(under, "told")).toEqual([])
})

test("a record field's entries and its characters are counted apart", () => {
  const value = { id: "a", slug: "one", directives: [{ name: "go", aids: ["ab", "cd", "ef", "g"] }] }
  expect(over(value, "told")).toEqual([
    "holds 4 of `directives aids`, over the max of 3",
    "holds 7 characters of `directives aids`, over the total of 6",
  ])
})

test("a single value declared many is refused, and a list declared single is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: "x" }, "check")).toEqual([
    "states `aids` singly, and `page-type/check` declares it many",
  ])
  expect(over({ id: "a", slug: "one", test: ["ts"] }, "check")).toEqual([
    "states `test` as a list, and `page-type/check` declares it single",
  ])
})

test("a page type that declares nothing anywhere leaves an empty map", () => {
  expect(declaredFor("no-such-type", read).size).toBe(0)
})

test("a list repeating a value is refused, and one carrying each once is not", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "x"] }, "check")).toEqual([
    `repeats "x" in \`aids\`, and a list carries each value once`,
  ])
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "y"] }, "check")).toEqual([])
})

test("a value the format its property states refuses is refused here", () => {
  expect(over({ id: "a", slug: "One", test: "ts" }, "check")).toEqual([
    '`slug` is "One", which is not written in `all-lower`',
  ])
})

test("a value the format its property states admits raises nothing", () => {
  expect(over({ id: "a", slug: "one-two", test: "ts" }, "check")).toEqual([])
})

test("a text property stating no format has its values passed over", () => {
  expect(over({ id: "a", slug: "one", test: "TS" }, "check")).toEqual([])
})

test("a record field is judged by the format its own property states", () => {
  expect(over({ id: "a", slug: "one", directives: [{ name: "Go" }] }, "told")).toEqual([
    '`directives name` is "Go", which is not written in `all-lower`',
  ])
})

test("a value both over its max and off its format is refused for each", () => {
  expect(over({ id: "a", slug: "Far-Too-Long", test: "ts" }, "check")).toEqual([
    "`slug` runs to 12 characters, over the max of 8",
    '`slug` is "Far-Too-Long", which is not written in `all-lower`',
  ])
})

test("a format is asked for only where a property states one", () => {
  const asked: string[] = []
  const watching: Formatting = (nameFormatSlug) => {
    asked.push(nameFormatSlug)
    return allLower
  }
  reasonsIn(
    { id: "a", slug: "one", test: "ts" },
    declaredFor("check", read),
    property,
    "page-type/check",
    watching
  )
  expect(asked).toEqual([FORMAT])
})
