import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import { runChange as addKey } from "../../mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.code.ts"
import { refusing } from "../answer/change-answer.module.code.ts"
import { bodiesIn, type Reaching, type World } from "../change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../change-shadow/change-shadow.module.test-fixtures.ts"
import {
  askedIn,
  carriedIn,
  carryingOver,
  mostIn,
  spelledAs,
} from "./value-carrying.module.code.ts"

const ADD = "change-mechanical-file-content/add-page-property"

const RUNS: Reaching = (world, at, given) => {
  if (at === ADD) return Promise.resolve(addKey(world, given as Parameters<typeof addKey>[1]))
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "story/chapters-read/pages/one.story-chapter-read.ts"

const TWO_AT = "story/chapters-read/pages/two.story-chapter-read.ts"

const BAD_AT = "story/chapters-read/pages/bad.story-chapter-read.ts"

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
  [TWO_AT]: bodied("two", "story-read/delve"),
  [BAD_AT]: "const bad = 1\n",
}

type Values = ReadonlyMap<string, Readonly<Record<string, unknown>>>

const VALUES: Values = new Map([
  [ONE_AT, { slug: "one", partOfCollectionSlugs: ["salvos"] }],
  [TWO_AT, { slug: "two", partOfCollectionSlugs: ["story-read/delve"] }],
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
      propertiesIfNamed: () => carried,
      valuesByPath: () => values,
    } as never,
    reaching: RUNS,
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
    { path: TWO_AT, value: `"story-read/delve"` },
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
  expect(carriedIn(typedIn(DECLARED), { ...CARRYING, most: 1 })).toEqual([
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

test("a run handed no count is held to no count", () => {
  expect(mostIn(undefined)).toBeNull()
})

test("a count handed in is read as a whole number", () => {
  expect(mostIn("2")).toBe(2)
})

test("a count that is no whole number above nothing is refused", () => {
  expect(mostIn("none")).toContain("is no count of pages")
})

test("the arguments handed in become what the carrying is asked for", () => {
  expect(askedIn({ "page-type": "story-chapter-read", from: "a", to: "b", most: "3" })).toEqual({
    pageType: "story-chapter-read",
    from: "a",
    to: "b",
    most: 3,
  })
})

test("an argument handed no value is refused by the key naming that argument", () => {
  expect(askedIn({ from: "a", to: "b" })).toMatch(/`page-type` names what this change is handed/)
})

test("each change reached gathers into one answer over the edits before it", async () => {
  const world = typedIn(DECLARED)
  const carrier = carryingOver(world)

  const put = await carrier.reaching(ADD, {
    at: ONE_AT,
    key: "storySlug",
    value: `"salvos"`,
    after: "partOfCollectionSlugs",
  })

  expect(put).toBeNull()
  const said = carrier.gatheredIn()
  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(`storySlug: "salvos"`)
})

test("a change refused is answered by the reason that change gave", async () => {
  const carrier = carryingOver(typedIn(DECLARED))

  const put = await carrier.reaching(ADD, { at: BAD_AT, key: "storySlug", value: `"salvos"` })

  expect(put).not.toBeNull()
  expect(carrier.gatheredIn().edits).toEqual([])
})
