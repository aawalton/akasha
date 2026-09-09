import { expect, test } from "bun:test"
import { type Identifying, identifyingFrom, sourceOver } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import type { Identifier } from "../entries/index-entries.module.code.ts"
import { A, B, C } from "../entries/index-entries.module.test-fixtures.ts"
import { filedIn, identityIn } from "./index-identity.index.code.ts"

function identifying(held: Record<string, ReadonlyMap<string, Identifier>>): Identifying {
  return (pageTypeSlug) => held[pageTypeSlug] ?? new Map<string, Identifier>()
}

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH, module: BOTH })

test("a value carrying its two identifiers is filed under its id and under its page type and slug", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", UNIQUE)).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/page-type/domain/slug/a.jsonl", line },
  ])
})

test("a page holding files is filed under no path here, a path being no identifier", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/deep/a.module.ts", "/repo", UNIQUE)).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/page-type/module/slug/a.jsonl", line },
  ])
})

test("a value carrying no identifier at all is filed nowhere", () => {
  expect(
    identityIn({ pageTypeSlug: "domain", slug: "a" }, "/repo/a.domain.ts", "/repo", UNIQUE)
  ).toEqual([])
})

test("an identifier is read by the key its property states rather than by its slug", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["held-name", { key: "named", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, pageTypeSlug: "domain", slug: "a", named: "n", heldName: "s" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "identity/page-type/domain/held-name/n.jsonl", line },
  ])
})

test("a value is filed under no identifier its own page type does not carry", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["slug", { key: "slug", uniqueKind: "page-type" }]]),
    other: new Map<string, Identifier>([["held-name", { key: "named", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, pageTypeSlug: "domain", slug: "a", named: "n" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "identity/page-type/domain/slug/a.jsonl", line },
  ])
})

test("an identifier held as a number is filed under the text of that number", () => {
  const keyed = identifying({
    domain: new Map<string, Identifier>([["tally", { key: "tally", uniqueKind: "page-type" }]]),
  })
  const value = { id: A, pageTypeSlug: "domain", slug: "a", tally: 7 }

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "identity/page-type/domain/tally/7.jsonl", line: `{"path":"a.domain.ts","id":"${A}"}` },
  ])
})

test("only the identifiers named are filed where a set narrows them", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", UNIQUE, new Set(["slug"]))).toEqual([
    { at: "identity/page-type/domain/slug/a.jsonl", line },
  ])
})

const PAGE_TYPE: Value = {
  id: B,
  pageTypeSlug: "page-type",
  slug: "page",
  extends: [],
  properties: [{ pagePropertySlug: "slug", required: true, many: false }],
}

const SLUG_PROPERTY: Value = {
  id: C,
  pageTypeSlug: "text-property",
  slug: "slug",
  propertySlug: "slug",
  unique: "page-type",
}

const DECLARING = identifyingFrom(sourceOver([PAGE_TYPE, SLUG_PROPERTY]))

test("a page type narrowing no unique kind takes the kind its property states", () => {
  expect(DECLARING("page").get("slug")).toEqual({ key: "slug", uniqueKind: "page-type" })
})

const SECTION_TYPE: Value = {
  id: A,
  pageTypeSlug: "page-type",
  slug: "section",
  extends: ["page-type/page"],
  properties: [
    {
      pagePropertySlug: "slug",
      required: true,
      many: false,
      unique: "page-property",
      uniqueProperty: "section-of-slug",
    },
    { pagePropertySlug: "section-of-slug", required: true, many: false },
  ],
}

const SECTION_OF: Value = {
  id: B,
  pageTypeSlug: "relation-property",
  slug: "section-of-slug",
  propertySlug: "section-of-slug",
}

const SCOPING = identifyingFrom(sourceOver([SECTION_TYPE, PAGE_TYPE, SLUG_PROPERTY, SECTION_OF]))

const PRICING: Value = {
  id: A,
  pageTypeSlug: "section",
  slug: "pricing",
  sectionOfSlug: "section/solar-power",
}

test("a declaration naming a scoping property carries the key that property is read by", () => {
  expect(SCOPING("section").get("slug")).toEqual({
    key: "slug",
    uniqueKind: "page-property",
    scopedBy: { key: "sectionOfSlug", pagePropertySlug: "section-of-slug" },
  })
})

test("a page unique among those carrying one value is filed under its type, that property and that value", () => {
  expect(filedIn(PRICING, SCOPING)).toEqual([
    {
      uniqueKind: "page-property",
      scope: "section/section-of-slug/solar-power",
      propertySlug: "slug",
      said: "pricing",
    },
  ])
})

test("a page carrying no value of the property scoping it is filed nowhere", () => {
  const bare: Value = { id: A, pageTypeSlug: "section", slug: "pricing" }

  expect(filedIn(bare, SCOPING)).toEqual([])
})
