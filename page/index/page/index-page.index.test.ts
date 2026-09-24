import { expect, test } from "bun:test"
import type { Identifier } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { A } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import { identifying } from "akasha/page/index/modules/identifying/index-identifying.module.test-fixtures.ts"
import { filedByPage, pageIn } from "akasha/page/index/page/index-page.index.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH, module: BOTH })

test("a page unique across every page is filed under the property and the value alone", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(pageIn(value, "/repo/a.domain.ts", "/repo", UNIQUE)).toEqual([
    { at: `page/id/${A.slice(-2)}/${A}.jsonl`, line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("a page unique across every page is filed under no scope", () => {
  expect(filedByPage({ id: A, type: `${pageType.slug}/domain`, slug: "a" }, UNIQUE)).toEqual([
    { uniqueKind: "page", scope: "", propertySlug: "id", said: A },
  ])
})

test("an identifier unique within anything narrower is filed nowhere here", () => {
  const typed = identifying({
    domain: new Map<string, Identifier>([["slug", { key: "slug", uniqueKind: "page-type" }]]),
  })

  expect(
    pageIn(
      { id: A, type: `${pageType.slug}/domain`, slug: "a" },
      "/repo/a.domain.ts",
      "/repo",
      typed
    )
  ).toEqual([])
})

test("a page holding files is filed under no path here, a path being no identifier", () => {
  const value = { id: A, type: `${pageType.slug}/module`, slug: "a", code: "ts", test: "ts" }

  expect(pageIn(value, "/repo/deep/a.module.ts", "/repo", UNIQUE)).toEqual([
    { at: `page/id/${A.slice(-2)}/${A}.jsonl`, line: `{"path":"deep/a.module.ts","id":"${A}"}` },
  ])
})

test("a value carrying no identifier at all is filed nowhere", () => {
  expect(
    pageIn({ type: `${pageType.slug}/domain`, slug: "a" }, "/repo/a.domain.ts", "/repo", UNIQUE)
  ).toEqual([])
})

test("only the identifiers named are filed where a set narrows them", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(pageIn(value, "/repo/a.domain.ts", "/repo", UNIQUE, new Set(["slug"]))).toEqual([])
})
