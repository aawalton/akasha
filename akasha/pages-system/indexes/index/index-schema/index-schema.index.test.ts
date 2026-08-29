import { expect, test } from "bun:test"
import { A, SCHEMA } from "../../index-entries/index-entries.module.test-fixtures.ts"
import { schemaIn } from "./index-schema.index.code.ts"

test("a property is filed under its slug with the shape it is, and a target it does not name is held as null", () => {
  const value = { id: A, pageTypeSlug: "file-property", slug: "code" }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/code.jsonl", line: SCHEMA.code },
  ])
})

test("a target naming its page type is filed as the slug alone", () => {
  const value = {
    pageTypeSlug: "relation-property",
    slug: "domain-slug",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/domain-slug.jsonl", line: SCHEMA.domainSlug },
  ])
})

test("a property naming many pages is filed under its slug with the target it names itself", () => {
  const value = {
    id: A,
    pageTypeSlug: "relation-property",
    slug: "part-slugs",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/slug/part-slugs.jsonl", line: SCHEMA.partSlugs },
  ])
})

test("a page that is no property shape, and a property stating no slug, are filed with no schema", () => {
  expect(schemaIn({ id: A, pageTypeSlug: "domain", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "page-property", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "text-property" })).toEqual([])
})
