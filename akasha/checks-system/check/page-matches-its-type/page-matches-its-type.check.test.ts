import { expect, test } from "bun:test"
import type { Value } from "../../../pages-system/index/index-entries.module.code.ts"
import { declaredFor, reasonsIn, slugOf, type Reading } from "./page-matches-its-type.check.code.ts"

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
      { pagePropertySlug: "aids", required: false, many: true, max: 2 },
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
  slug: { pageTypeSlug: "text-property", slug: "slug", max: 8 },
  test: { pageTypeSlug: "text-property", slug: "test", max: 4 },
  aids: { pageTypeSlug: "text-property", slug: "aids", max: 5 },
}

const read: Reading = (pageTypeSlug, slug) =>
  pageTypeSlug === "page-type" ? (TYPES[slug] ?? null) : null

const property = (slug: string): Value | null => PROPERTIES[slug] ?? null

function over(value: Value, pageTypeSlug: string): readonly string[] {
  return reasonsIn(value, declaredFor(pageTypeSlug, read), property, `page-type/${pageTypeSlug}`)
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
