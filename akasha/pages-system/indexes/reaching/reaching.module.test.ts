import { afterAll, expect, test } from "bun:test"
import {
  A,
  B,
  C,
  D,
  grounded,
  scratch,
  standing,
} from "../index-entries/index-entries.module.test-fixtures.ts"
import { knownIn, reaches, relationIn } from "./reaching.module.code.ts"

afterAll(scratch.sweep)

test("a property naming many pages takes the target it names itself, and opens no page to do it", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect(known.targetOf("part-slugs")).toBe("domain")
  expect(known.targetOf("code")).toBe(null)
  expect(known.targetOf("design")).toBe(null)
})

test("a page type admits a target every page type it extends up to also admits", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect([...known.admitting("domain")].sort()).toEqual(["domain", "module"])
  expect(known.admitting("page-property")).toEqual([])
})

test("a name carrying no page type reaches the one page admitting its property's target", () => {
  expect(reaches("c", "domain", standing({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying no page type and narrowing to two pages is refused rather than resolved", () => {
  const reached = reaches("b", "domain", standing({ "domain/b": B, "module/b": D }))

  expect("refused" in reached && reached.refused).toMatch(/narrows to 2 pages/)
})

test("a name carrying its page type reaches that page when the property declares no target", () => {
  expect(reaches("domain/b", null, standing({ "domain/b": B }))).toEqual({ id: B })
})

test("a name carrying a page type standing under the target reaches that page", () => {
  expect(reaches("module/c", "domain", standing({ "module/c": C }))).toEqual({ id: C })
})

test("a name carrying a page type the target does not admit is refused, never resolved", () => {
  const reached = reaches("page-property/b", "domain", standing({ "page-property/b": B }))

  expect("refused" in reached && reached.refused).toMatch(/admits only `domain`/)
})

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

test("a record property answers the fields it declares, and another property answers none", () => {
  const { root, repo } = grounded()
  const known = knownIn(root, repo)

  expect(known.fieldsOf("parts")).toEqual(["part-slugs"])
  expect(known.fieldsOf("part-slugs")).toEqual([])
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
