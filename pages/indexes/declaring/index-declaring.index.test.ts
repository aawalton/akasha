import { expect, test } from "bun:test"
import {
  DECLARING_AT,
  DECLARING_UNDER,
  declaredOf,
} from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import { schemaIn } from "akasha/pages/indexes/schema/index-schema.index.code.ts"

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

test("every shape the schema index files is one line of that one file", () => {
  const filed = schemaIn(VALUE)

  expect(declaredOf(filed)).toEqual([{ at: DECLARING_AT, line: SHAPE }])
})

test("a line carries the shape the schema index files, unchanged", () => {
  const filed = schemaIn(VALUE)

  expect(filed[0]?.at).toBe("schema/page-property/text-property/slug/slug.jsonl")
  expect(declaredOf(filed).map((one) => one.line)).toEqual(filed.map((one) => one.line))
})

test("a page the schema index files nothing for is filed here for nothing", () => {
  expect(declaredOf(schemaIn({ pageTypeSlug: "domain", slug: "a" }))).toEqual([])
})
