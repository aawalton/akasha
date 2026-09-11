import { expect, test } from "bun:test"
import {
  DECLARING_AT,
  DECLARING_UNDER,
  declaredIn,
} from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"

const VALUE = { pageTypeSlug: "text-property", slug: "slug", propertySlug: "slug" }

const SHAPE = JSON.stringify({
  pageTypeSlug: "text-property",
  targetPageTypeSlug: null,
  unique: null,
  uniquePropertySlug: null,
  slug: "slug",
  propertySlug: "slug",
  fileName: null,
  folderName: null,
})

test("the one file this index files is named for the index", () => {
  expect(DECLARING_UNDER).toBe("declaring")
  expect(DECLARING_AT).toBe("declaring/page-property.jsonl")
})

test("a page property is one line of that one file", () => {
  expect(declaredIn(VALUE)).toEqual([{ at: DECLARING_AT, line: SHAPE }])
})

test("a page stating a property slug is a page property whatever page type that page is", () => {
  const said = declaredIn({ pageTypeSlug: "worded-property", slug: "tally", propertySlug: "tally" })

  expect(said[0]?.at).toBe(DECLARING_AT)
})

test("a page stating no property slug is filed here for nothing", () => {
  expect(declaredIn({ pageTypeSlug: "domain", slug: "a" })).toEqual([])
})

test("a page stating its page type under `type` is filed under that page type", () => {
  const said = declaredIn({ type: "text-property", slug: "held", propertySlug: "held" })

  expect(JSON.parse(said[0]?.line ?? "")).toMatchObject({ pageTypeSlug: "text-property" })
})

test("a value the property does not have is held as null rather than left out", () => {
  const said = JSON.parse(declaredIn(VALUE)[0]?.line ?? "") as Record<string, unknown>

  expect(said["targetPageTypeSlug"]).toBe(null)
  expect(said["unique"]).toBe(null)
  expect(said["fileName"]).toBe(null)
  expect(said["folderName"]).toBe(null)
})

test("a qualified name is held as its slug alone", () => {
  const said = declaredIn({
    pageTypeSlug: "relation-property",
    slug: "page-domain",
    propertySlug: "domain",
    targetPageType: "page-type/domain",
    unique: "page-property",
    uniqueProperty: "relation-property/page-domain",
  })

  expect(JSON.parse(said[0]?.line ?? "")).toMatchObject({
    targetPageTypeSlug: "domain",
    unique: "page-property",
    uniquePropertySlug: "page-domain",
  })
})
