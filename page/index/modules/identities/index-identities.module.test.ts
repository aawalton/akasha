import { expect, test } from "bun:test"
import type { Identifier } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { A } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import { identifying } from "akasha/page/index/modules/identifying/index-identifying.module.test-fixtures.ts"
import {
  filedIn,
  identitiesIn,
} from "akasha/page/index/modules/identities/index-identities.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH })

test("a value carrying its two identifiers is filed in the page index and the page type index", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identitiesIn(value, "/repo/a.domain.ts", "/repo", UNIQUE)).toEqual([
    { at: `page/id/${A.slice(-2)}/${A}.jsonl`, line },
    { at: "page-type/domain/slug/a.jsonl", line },
  ])
})

test("the indexes are asked in the order a page is reached by", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(filedIn(value, UNIQUE).map((one) => one.uniqueKind)).toEqual(["page", "page-type"])
})

test("an index the page states no identifier for answers nothing", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(filedIn(value, UNIQUE).some((one) => one.uniqueKind === "page-property")).toBe(false)
})

test("a value carrying no identifier at all is filed nowhere", () => {
  expect(
    identitiesIn(
      { type: `${pageType.slug}/domain`, slug: "a" },
      "/repo/a.domain.ts",
      "/repo",
      UNIQUE
    )
  ).toEqual([])
})

test("only the identifiers named are filed where a set narrows them", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identitiesIn(value, "/repo/a.domain.ts", "/repo", UNIQUE, new Set(["slug"]))).toEqual([
    { at: "page-type/domain/slug/a.jsonl", line },
  ])
})

test("a unique kind no index files is a fault rather than a value filed nowhere", () => {
  const stray = identifying({
    domain: new Map<string, Identifier>([["slug", { key: "slug", uniqueKind: "held" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(() => filedIn(value, stray)).toThrow("`held` is no unique kind a page is filed under")
  expect(() => identitiesIn(value, "/repo/a.domain.ts", "/repo", stray)).toThrow(
    "`held` is no unique kind a page is filed under"
  )
})
