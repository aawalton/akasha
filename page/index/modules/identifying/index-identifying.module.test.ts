import { expect, test } from "bun:test"
import type { Identifier } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { A } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import {
  entriesFor,
  identifiedIn,
  keyFor,
  lineFor,
  statedOf,
} from "akasha/page/index/modules/identifying/index-identifying.module.code.ts"
import { identifying } from "akasha/page/index/modules/identifying/index-identifying.module.test-fixtures.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH })

test("a key is the index's own folder followed by the scope, the property and the value", () => {
  expect(
    keyFor({ uniqueKind: "page-type", scope: "domain", propertySlug: "slug", said: "a" })
  ).toBe("page-type/domain/slug/a")
})

test("a key under no scope names the index's folder and the value's last two characters", () => {
  expect(keyFor({ uniqueKind: "page", scope: "", propertySlug: "id", said: A })).toBe(
    `page/id/${A.slice(-2)}/${A}`
  )
})

test("a page states the identifiers its own page type declares", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(identifiedIn(value, UNIQUE)).toEqual({
    pageTypeSlug: "domain",
    stated: [
      { propertySlug: "id", uniqueKind: "page", scopedBy: undefined, said: A },
      { propertySlug: "slug", uniqueKind: "page-type", scopedBy: undefined, said: "a" },
    ],
  })
})

test("a page's own type is read as a slug wherever it is said", () => {
  expect(identifiedIn({ id: A, type: "domain", slug: "a" }, UNIQUE)?.pageTypeSlug).toBe("domain")
})

test("a page stating no id, no slug or no page type states no identifier", () => {
  expect(identifiedIn({ type: `${pageType.slug}/domain`, slug: "a" }, UNIQUE)).toBeNull()
  expect(identifiedIn({ id: A, type: `${pageType.slug}/domain` }, UNIQUE)).toBeNull()
  expect(identifiedIn({ id: A, slug: "a" }, UNIQUE)).toBeNull()
})

test("an identifier is read by the key its property states rather than by its slug", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["held-name", { key: "named", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a", named: "n", heldName: "s" }

  expect(identifiedIn(value, keyed)?.stated).toEqual([
    { propertySlug: "held-name", uniqueKind: "page-type", scopedBy: undefined, said: "n" },
  ])
})

test("an identifier held as a number is read as the text of that number", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["tally", { key: "tally", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a", tally: 7 }

  expect(identifiedIn(value, keyed)?.stated[0]?.said).toBe("7")
})

test("an identifier held as neither text nor a number is not read", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["tally", { key: "tally", uniqueKind: "page-type" }]]),
  })

  expect(
    identifiedIn({ id: A, type: `${pageType.slug}/domain`, slug: "a", tally: [1] }, keyed)?.stated
  ).toEqual([])
})

test("only the identifiers named are read where a set narrows them", () => {
  const value = { id: A, type: `${pageType.slug}/domain`, slug: "a" }

  expect(identifiedIn(value, UNIQUE, new Set(["slug"]))?.stated).toEqual([
    { propertySlug: "slug", uniqueKind: "page-type", scopedBy: undefined, said: "a" },
  ])
})

test("the identifiers of one unique kind are taken apart from the rest", () => {
  const held = identifiedIn({ id: A, type: `${pageType.slug}/domain`, slug: "a" }, UNIQUE)
  if (held === null) throw new Error("the value states identifiers")

  expect(statedOf(held, "page").map((one) => one.propertySlug)).toEqual(["id"])
  expect(statedOf(held, "page-type").map((one) => one.propertySlug)).toEqual(["slug"])
  expect(statedOf(held, "page-property")).toEqual([])
})

test("a line has the page's path relative to the repository root and its id", () => {
  expect(lineFor({ id: A }, "/repo/deep/a.domain.ts", "/repo")).toBe(
    `{"path":"deep/a.domain.ts","id":"${A}"}`
  )
})

test("a value carrying no id makes no line", () => {
  expect(lineFor({ slug: "a" }, "/repo/a.domain.ts", "/repo")).toBeNull()
})

test("an entry is filed at the key that answer is found by, closing with `.jsonl`", () => {
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(
    entriesFor(
      [{ uniqueKind: "page-type", scope: "domain", propertySlug: "slug", said: "a" }],
      line
    )
  ).toEqual([{ at: "page-type/domain/slug/a.jsonl", line }])
})
