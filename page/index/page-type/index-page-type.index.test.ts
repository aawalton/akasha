import { expect, test } from "bun:test"
import type { Identifier } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { A, B, C } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import { identifying } from "akasha/page/index/modules/identifying/index-identifying.module.test-fixtures.ts"
import {
  filedByPageType,
  pageTypeIn,
} from "akasha/page/index/page-type/index-page-type.index.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH, module: BOTH })

test("a page unique within its type is filed under that type, the property and the value", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(pageTypeIn(value, "/repo/a.domain.ts", "/repo", UNIQUE)).toEqual([
    { at: "page-type/domain/slug/a.jsonl", line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("a scope is the page type the value is unique within", () => {
  expect(filedByPageType({ id: A, type: `${pageType.slug}/module`, slug: "a" }, UNIQUE)).toEqual([
    { uniqueKind: "page-type", scope: "module", propertySlug: "slug", said: "a" },
  ])
})

test("an identifier unique across every page is filed nowhere here", () => {
  const whole = identifying({
    domain: new Map<string, Identifier>([["id", { key: "id", uniqueKind: "page" }]]),
  })

  expect(
    pageTypeIn(
      { id: A, type: `${pageType.slug}/domain`, slug: "a" },
      "/repo/a.domain.ts",
      "/repo",
      whole
    )
  ).toEqual([])
})

test("an identifier is read by the key its property states rather than by its slug", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["held-name", { key: "named", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a", named: "n", heldName: "s" }

  expect(pageTypeIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "page-type/domain/held-name/n.jsonl", line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("a value is filed under no identifier its own page type does not carry", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["slug", { key: "slug", uniqueKind: "page-type" }]]),
    other: new Map<string, Identifier>([["held-name", { key: "named", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a", named: "n" }

  expect(pageTypeIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "page-type/domain/slug/a.jsonl", line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("an identifier held as a number is filed under the text of that number", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["tally", { key: "tally", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a", tally: 7 }

  expect(pageTypeIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "page-type/domain/tally/7.jsonl", line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("only the identifiers named are filed where a set narrows them", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pageTypeIn(value, "/repo/a.domain.ts", "/repo", UNIQUE, new Set(["slug"]))).toEqual([
    { at: "page-type/domain/slug/a.jsonl", line },
  ])
})

const PAGE_TYPE: Value = {
  id: B,
  type: `${pageType.slug}/${pageType.slug}`,
  slug: "page",
  extends: [],
  properties: [{ pagePropertySlug: "slug", required: true, many: false }],
}

const SLUG_PROPERTY: Value = {
  id: C,
  type: `${pageType.slug}/text-property`,
  slug: "slug",
  propertySlug: "slug",
  unique: "page-type",
}

const DECLARING = identifyingFrom(sourceOver([PAGE_TYPE, SLUG_PROPERTY]))

test("a page type narrowing no unique kind takes the kind its property states", () => {
  expect(DECLARING("page").get("slug")).toEqual({ key: "slug", uniqueKind: "page-type" })
})
