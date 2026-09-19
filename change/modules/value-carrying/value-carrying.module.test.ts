import { expect, test } from "bun:test"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  askedIn,
  atMostIn,
  carriedIn,
  holdingIn,
  keyAskedIn,
  spelledAs,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { delve } from "akasha/story/read/pages/delve/delve.story-read.ts"
import { storyRead } from "akasha/story/read/story-read.page-type.ts"

const ONE_AT = "story/chapter-read/pages/one.story-chapter-read.ts"

const TWO_AT = "story/chapter-read/pages/two.story-chapter-read.ts"

const DELVE = `${storyRead.slug}/${delve.slug}` as const

function bodied(slug: string, parent: string): string {
  return `import type { StoryChapterRead } from "../story-chapter-read.page-type.ts"

export const ${slug} = {
  pageTypeSlug: "story-chapter-read",
  slug: "${slug}",
  partOfCollectionSlugs: ["${parent}"],
  position: 1,
} as const satisfies StoryChapterRead
`
}

const BODIES = {
  [ONE_AT]: bodied("one", "salvos"),
  [TWO_AT]: bodied("two", DELVE),
}

type Values = ReadonlyMap<string, Readonly<Record<string, unknown>>>

const VALUES: Values = new Map([
  [ONE_AT, { slug: "one", partOfCollectionSlugs: ["salvos"] }],
  [TWO_AT, { slug: "two", partOfCollectionSlugs: [DELVE] }],
])

const ONE_VALUE: Carried = {
  pagePropertySlug: "story-slug",
  pageTypeSlug: "relation-property",
  propertySlug: "story-slug",
  key: "storySlug",
  unique: null,
  declaredBy: "story-chapter-read",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const MANY_VALUES: Carried = {
  ...ONE_VALUE,
  pagePropertySlug: "part-of-collection-slugs",
  propertySlug: "part-of-collection-slugs",
  key: "partOfCollectionSlugs",
  many: true,
}

const DECLARED = [ONE_VALUE, MANY_VALUES]

const CARRYING = {
  pageType: "story-chapter-read",
  from: "partOfCollectionSlugs",
  to: "storySlug",
}

function typedIn(carried: readonly Carried[] | null, values: Values = VALUES): World {
  return {
    ...worldOf(BODIES),
    index: {
      kindsUnder: () => new Set(["story-chapter-read"]),
      pageTypesIn: () => new Set(["story-chapter-read"]),
      propertiesIfNamed: () => carried,
      valuesByPath: () => values,
    } as never,
    reaching: running,
  }
}

test("a list of one becomes one value where the key written to holds one value", () => {
  expect(spelledAs(["salvos"], false)).toBe(`"salvos"`)
})

test("a list is left a list where the key written to holds many values", () => {
  expect(spelledAs(["salvos"], true)).toBe(`["salvos"]`)
})

test("a list of more than one is no value where the key written to holds one value", () => {
  expect(spelledAs(["salvos", "delve"], false)).toBeNull()
})

test("every page with the key read from is carried, with the value the body spells", () => {
  expect(carriedIn(typedIn(DECLARED), CARRYING)).toEqual([
    { path: ONE_AT, value: `"salvos"` },
    { path: TWO_AT, value: `"${DELVE}"` },
  ])
})

test("a page already with the key written to is passed over rather than refused", () => {
  const values: Values = new Map([
    [ONE_AT, { partOfCollectionSlugs: ["salvos"], storySlug: "salvos" }],
  ])

  expect(carriedIn(typedIn(DECLARED, values), CARRYING)).toEqual([])
})

test("a page with no value under the key read from is passed over rather than refused", () => {
  const values: Values = new Map([[ONE_AT, { slug: "one" }]])

  expect(carriedIn(typedIn(DECLARED, values), CARRYING)).toEqual([])
})

test("a count handed in holds how many pages are carried on", () => {
  expect(carriedIn(typedIn(DECLARED), { ...CARRYING, atMost: 1 })).toEqual([
    { path: ONE_AT, value: `"salvos"` },
  ])
})

test("a list of more than one is refused where the key written to holds one value", () => {
  const values: Values = new Map([[ONE_AT, { partOfCollectionSlugs: ["salvos", "delve"] }]])

  const said = carriedIn(typedIn(DECLARED, values), CARRYING)

  expect(said).toContain("more than one value under `partOfCollectionSlugs`")
})

test("a page type the index does not name is refused", () => {
  expect(carriedIn(typedIn(null), CARRYING)).toBe("`story-chapter-read` names no page type")
})

test("a page type with no property under the key written to is refused", () => {
  expect(carriedIn(typedIn([MANY_VALUES]), CARRYING)).toContain("has no property under `storySlug`")
})

test("a page type with no property under the key read from is refused", () => {
  expect(carriedIn(typedIn([ONE_VALUE]), CARRYING)).toContain(
    "has no property under `partOfCollectionSlugs`"
  )
})

const HOLDING = { pageType: "story-chapter-read", key: "partOfCollectionSlugs" }

test("every page holding the key is answered by the path that page sits at", () => {
  expect(holdingIn(typedIn(DECLARED), HOLDING)).toEqual([ONE_AT, TWO_AT])
})

test("a page holding no value under that key is passed over rather than refused", () => {
  const values: Values = new Map([[ONE_AT, { slug: "one" }]])

  expect(holdingIn(typedIn(DECLARED, values), HOLDING)).toEqual([])
})

test("a count handed in holds how many pages holding the key are answered", () => {
  expect(holdingIn(typedIn(DECLARED), { ...HOLDING, atMost: 1 })).toEqual([ONE_AT])
})

test("a key the page type no longer declares is answered rather than refused", () => {
  expect(holdingIn(typedIn([ONE_VALUE]), HOLDING)).toEqual([ONE_AT, TWO_AT])
})

test("a page type the index does not name is refused over one key", () => {
  expect(holdingIn(typedIn(null), HOLDING)).toBe("`story-chapter-read` names no page type")
})

test("a run over one key handed no page type is refused by the key naming that argument", () => {
  expect(keyAskedIn({ key: "a" })).toMatch(/`page-type` names what this change is handed/)
})

test("the arguments handed in become what a run over one key is asked for", () => {
  expect(keyAskedIn({ "page-type": "story-chapter-read", key: "a", "at-most": "3" })).toEqual({
    pageType: "story-chapter-read",
    key: "a",
    atMost: 3,
  })
})

test("a run over one key handed no key is refused by the key naming that argument", () => {
  expect(keyAskedIn({ "page-type": "story-chapter-read" })).toMatch(
    /`key` names what this change is handed/
  )
})

test("a run handed no count is held to no count", () => {
  expect(atMostIn(undefined)).toBeNull()
})

test("a count handed in is read as a whole number", () => {
  expect(atMostIn("2")).toBe(2)
})

test("a count that is no whole number above nothing is refused", () => {
  expect(atMostIn("none")).toContain("is no count of pages")
})

test("the arguments handed in become what the carrying is asked for", () => {
  expect(
    askedIn({ "page-type": "story-chapter-read", from: "a", to: "b", "at-most": "3" })
  ).toEqual({
    pageType: "story-chapter-read",
    from: "a",
    to: "b",
    atMost: 3,
  })
})

test("an argument handed no value is refused by the key naming that argument", () => {
  expect(askedIn({ from: "a", to: "b" })).toMatch(/`page-type` names what this change is handed/)
})
