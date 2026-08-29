import { expect, test } from "bun:test"
import { A, B, standing } from "../../index-entries/index-entries.module.test-fixtures.ts"
import { relationIn } from "./index-relation.index.code.ts"

test("a property naming a page is filed under that page's id against the property's kebab slug", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["domain/b"] }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [
      { at: `relation/page/id/${B}/part-slugs/${A}.jsonl`, line: '{"path":"a.domain.ts"}' },
    ],
    refused: [],
  })
})

test("a property naming no page is reported and files no edge", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", partSlugs: ["nowhere"] }
  const filed = relationIn(value, "/repo/a.domain.ts", standing({}), "/repo")

  expect(filed.entries).toEqual([])
  expect(filed.refused[0] ?? "").toMatch(/carries the slug `nowhere`/)
})

test("a relation nested in a record is filed from the page, and twice over files one edge", () => {
  const value = {
    id: A,
    pageTypeSlug: "domain",
    slug: "a",
    parts: [{ partSlugs: ["domain/b"] }, { partSlugs: ["domain/b"] }],
  }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [
      { at: `relation/page/id/${B}/part-slugs/${A}.jsonl`, line: '{"path":"a.domain.ts"}' },
    ],
    refused: [],
  })
})

test("a field the record does not declare, and a record nested deeper, file no edge", () => {
  const value = {
    id: A,
    pageTypeSlug: "domain",
    slug: "a",
    parts: [{ heldSlugs: ["domain/b"], inner: { partSlugs: ["domain/b"] } }],
    holds: [{ partSlugs: ["domain/b"] }],
  }

  expect(relationIn(value, "/repo/a.domain.ts", standing({ "domain/b": B }), "/repo")).toEqual({
    entries: [],
    refused: [],
  })
})

test("a record entry naming no page is reported against the record and the field it states", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", parts: [{ partSlugs: ["nowhere"] }] }
  const filed = relationIn(value, "/repo/a.domain.ts", standing({}), "/repo")

  expect(filed.entries).toEqual([])
  expect(filed.refused[0] ?? "").toMatch(/`parts part-slugs`/)
})
