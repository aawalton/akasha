import { expect, test } from "bun:test"
import { type Identifying, identifyingFrom, sourceOver } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import type { Identifier } from "../entries/index-entries.module.code.ts"
import { A, B, C } from "../entries/index-entries.module.test-fixtures.ts"
import {
  filedIn,
  identityIn,
  type Naming,
  partingIn,
  partingOver,
} from "./index-identity.index.code.ts"

function identifying(held: Record<string, ReadonlyMap<string, Identifier>>): Identifying {
  return (pageTypeSlug) => held[pageTypeSlug] ?? new Map<string, Identifier>()
}

const BOTH = new Map<string, Identifier>([
  ["id", { key: "id", uniqueKind: "page" }],
  ["slug", { key: "slug", uniqueKind: "page-type" }],
])

const UNIQUE = identifying({ domain: BOTH, module: BOTH })

const WITHIN = new Map<string, Identifier>([["slug", { key: "slug", uniqueKind: "part-of" }]])

const PARTED = identifying({ collection: WITHIN, route: WITHIN })

const HOME: Value = { id: A, pageTypeSlug: "route", slug: "home" }

const HOME_AT = "/repo/home.route.ts"

const HOME_LINE = `{"path":"home.route.ts","id":"${A}"}`

const WEB: Value = {
  id: B,
  pageTypeSlug: "router-app",
  slug: "alan-web",
  partSlugs: ["route/about", "route/home"],
}

const MOBILE: Value = {
  id: C,
  pageTypeSlug: "router-app",
  slug: "alan-mobile",
  partSlugs: ["route/home"],
}

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

test("a page naming the collections it is part of is filed under each of them", () => {
  const value = {
    id: A,
    pageTypeSlug: "collection",
    slug: "gorillaz",
    partOfSlugs: ["artists", "music"],
  }
  const line = `{"path":"gorillaz.collection.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/gorillaz.collection.ts", "/repo", PARTED)).toEqual([
    { at: "identity/part-of/artists/slug/gorillaz.jsonl", line },
    { at: "identity/part-of/music/slug/gorillaz.jsonl", line },
  ])
})

test("a page part of nothing is filed under no scope of the `part-of` unique kind", () => {
  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, partingIn([HOME]))).toEqual([])
})

test("a page another page names in its `partSlugs` is filed under that page's slug", () => {
  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, partingIn([HOME, WEB]))).toEqual([
    { at: "identity/part-of/alan-web/slug/home.jsonl", line: HOME_LINE },
  ])
})

test("a page two pages name in their `partSlugs` is filed under each of them", () => {
  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, partingIn([HOME, WEB, MOBILE]))).toEqual([
    { at: "identity/part-of/alan-web/slug/home.jsonl", line: HOME_LINE },
    { at: "identity/part-of/alan-mobile/slug/home.jsonl", line: HOME_LINE },
  ])
})

test("a name carrying a page type reaches a page of that page type alone", () => {
  const other: Value = {
    id: B,
    pageTypeSlug: "router-app",
    slug: "alan-web",
    partSlugs: ["page-type/home"],
  }

  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, partingIn([HOME, other]))).toEqual([])
})

test("a page both naming a collection and named by another page is filed under both", () => {
  const value: Value = { ...HOME, partOfSlugs: ["artists"] }

  expect(identityIn(value, HOME_AT, "/repo", PARTED, null, partingIn([value, WEB]))).toEqual([
    { at: "identity/part-of/artists/slug/home.jsonl", line: HOME_LINE },
    { at: "identity/part-of/alan-web/slug/home.jsonl", line: HOME_LINE },
  ])
})

test("what a page is filed under carries the unique kind, the scope, the property and the value", () => {
  expect(filedIn(HOME, PARTED, null, partingIn([HOME, WEB]))).toEqual([
    { uniqueKind: "part-of", scope: "alan-web", propertySlug: "slug", said: "home" },
  ])
})

const WEB_AT = "alan/web/alan-web.router-app.ts"

function filedAs(propertySlug: string): Naming {
  return (id) => (id === A ? [{ path: WEB_AT, propertySlug }] : [])
}

const NONE = new Set<string>()

test("a page the index says another page names is filed under that page's slug", () => {
  const parting = partingOver(filedAs("part-slugs"), [HOME], NONE)

  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, parting)).toEqual([
    { at: "identity/part-of/alan-web/slug/home.jsonl", line: HOME_LINE },
  ])
})

test("an edge of a page the change carries is read from the change rather than the index", () => {
  const parting = partingOver(filedAs("part-slugs"), [HOME], new Set([WEB_AT]))

  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, parting)).toEqual([])
})

test("an edge the index files under another property is passed over", () => {
  const parting = partingOver(filedAs("noted-slugs"), [HOME], NONE)

  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, parting)).toEqual([])
})

test("the pages in hand and the pages the index names are read together", () => {
  const parting = partingOver(filedAs("part-slugs"), [HOME, MOBILE], NONE)

  expect(identityIn(HOME, HOME_AT, "/repo", PARTED, null, parting)).toEqual([
    { at: "identity/part-of/alan-mobile/slug/home.jsonl", line: HOME_LINE },
    { at: "identity/part-of/alan-web/slug/home.jsonl", line: HOME_LINE },
  ])
})

const ROUTE_TYPE: Value = {
  id: A,
  pageTypeSlug: "page-type",
  slug: "route",
  extendsSlug: ["page-type/page"],
  properties: [{ pagePropertySlug: "slug", required: true, many: false, unique: "part-of" }],
}

const PAGE_TYPE: Value = {
  id: B,
  pageTypeSlug: "page-type",
  slug: "page",
  extendsSlug: [],
  properties: [{ pagePropertySlug: "slug", required: true, many: false }],
}

const SLUG_PROPERTY: Value = {
  id: C,
  pageTypeSlug: "text-property",
  slug: "slug",
  propertySlug: "slug",
  unique: "page-type",
}

const DECLARING = identifyingFrom(sourceOver([ROUTE_TYPE, PAGE_TYPE, SLUG_PROPERTY]))

const WEB_HOME: Value = { id: A, pageTypeSlug: "route", slug: "home", partOfSlugs: ["alan-web"] }

test("a declaration narrowing `unique` gives the kind it states rather than its property's", () => {
  expect(DECLARING("route").get("slug")).toEqual({ key: "slug", uniqueKind: "part-of" })
})

test("a page type narrowing no unique kind takes the kind its property states", () => {
  expect(DECLARING("page").get("slug")).toEqual({ key: "slug", uniqueKind: "page-type" })
})

test("two pages of one type carrying one slug under different parents are filed apart", () => {
  const mobile: Value = { ...WEB_HOME, id: B, partOfSlugs: ["alan-mobile"] }

  expect(filedIn(WEB_HOME, DECLARING)).toEqual([
    { uniqueKind: "part-of", scope: "alan-web", propertySlug: "slug", said: "home" },
  ])
  expect(filedIn(mobile, DECLARING)).toEqual([
    { uniqueKind: "part-of", scope: "alan-mobile", propertySlug: "slug", said: "home" },
  ])
})

test("two pages of one type carrying one slug under one parent are filed at one place", () => {
  const other: Value = { ...WEB_HOME, id: C }

  expect(filedIn(other, DECLARING)).toEqual([
    { uniqueKind: "part-of", scope: "alan-web", propertySlug: "slug", said: "home" },
  ])
  expect(filedIn(WEB_HOME, DECLARING)).toEqual(filedIn(other, DECLARING))
})

const SECTION_TYPE: Value = {
  id: A,
  pageTypeSlug: "page-type",
  slug: "section",
  extendsSlug: ["page-type/page"],
  properties: [
    {
      pagePropertySlug: "slug",
      required: true,
      many: false,
      unique: "page-property",
      uniquePropertySlug: "section-of-slug",
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
