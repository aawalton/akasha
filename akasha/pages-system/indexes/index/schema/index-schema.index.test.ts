import { expect, test } from "bun:test"
import { A, SCHEMA } from "../../index-entries/index-entries.module.test-fixtures.ts"
import { schemaIn } from "./index-schema.index.code.ts"

test("a property is filed under its page type and slug, and a target it does not name is held as null", () => {
  const value = { id: A, pageTypeSlug: "file-property", slug: "code", propertySlug: "code" }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/file-property/slug/code.jsonl", line: SCHEMA.code },
  ])
})

test("a target naming its page type is filed as the slug alone", () => {
  const value = {
    pageTypeSlug: "relation-property",
    slug: "domain-slug",
    propertySlug: "domain-slug",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    {
      at: "schema/page-property/relation-property/slug/domain-slug.jsonl",
      line: SCHEMA.domainSlug,
    },
  ])
})

test("a property naming many pages is filed under its slug with the target it names itself", () => {
  const value = {
    id: A,
    pageTypeSlug: "relation-property",
    slug: "part-slugs",
    propertySlug: "part-slugs",
    targetPageTypeSlug: "page-type/domain",
  }

  expect(schemaIn(value)).toEqual([
    { at: "schema/page-property/relation-property/slug/part-slugs.jsonl", line: SCHEMA.partSlugs },
  ])
})

test("two properties of one slug are filed apart, each under the page type it is", () => {
  const text = { id: A, pageTypeSlug: "text-property", slug: "foo", propertySlug: "foo" }
  const number = { id: A, pageTypeSlug: "number-property", slug: "foo", propertySlug: "foo" }

  expect(schemaIn(text)[0]?.at).toBe("schema/page-property/text-property/slug/foo.jsonl")
  expect(schemaIn(number)[0]?.at).toBe("schema/page-property/number-property/slug/foo.jsonl")
})

test("a line carries the key a page reads the property by", () => {
  const value = {
    id: A,
    pageTypeSlug: "text-property",
    slug: "part-slugs",
    propertySlug: "part-slugs",
  }

  expect(JSON.parse(schemaIn(value)[0]?.line ?? "")).toMatchObject({
    slug: "part-slugs",
    propertySlug: "part-slugs",
  })
})

test("a page stating no property slug, and a property stating no slug, are filed with no schema", () => {
  expect(schemaIn({ id: A, pageTypeSlug: "domain", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "page-property", slug: "a" })).toEqual([])
  expect(schemaIn({ id: A, pageTypeSlug: "text-property" })).toEqual([])
})

test("a property is filed whatever page type it is, so a new shape of property needs no code here", () => {
  const value = { id: A, pageTypeSlug: "worded-property", slug: "tally", propertySlug: "tally" }

  expect(schemaIn(value)[0]?.at).toBe("schema/page-property/worded-property/slug/tally.jsonl")
})
