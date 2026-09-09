import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import { runChange as addKey } from "../../../mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  copyPropertyOnEveryPage,
  runChange,
} from "./copy-property-on-every-page.change-agent.code.ts"

const RUNS: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/add-page-property") {
    return Promise.resolve(addKey(world, given as Parameters<typeof addKey>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "story/chapters-read/pages/one.story-chapter-read.ts"

const TWO_AT = "story/chapters-read/pages/two.story-chapter-read.ts"

const TYPE_AT = "story/chapters-read/story-chapter-read.page-type.ts"

const TYPED = `export type StoryChapterRead = {
  pageTypeSlug: string
  slug: string
  storySlug?: string
  partOfCollectionSlugs?: readonly string[]
  position?: number
}
`

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
  [TYPE_AT]: TYPED,
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

function pagesIn(
  bodies: Readonly<Record<string, string>>,
  carried: readonly Carried[] | null,
  values: Values = VALUES
): World {
  return {
    ...worldOf(bodies),
    index: {
      kindsUnder: () => new Set(["story-chapter-read"]),
      propertiesIfNamed: () => carried,
      valuesByPath: () => values,
    } as never,
    reaching: RUNS,
  }
}

const COPYING = {
  pageType: "story-chapter-read",
  from: "partOfCollectionSlugs",
  to: "storySlug",
}

test("every page of the page type has the value under the key written to", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await copyPropertyOnEveryPage(world, COPYING)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`storySlug: "salvos"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`storySlug: "story-read/delve"`)
})

test("the key read from is left where it is, with the value that key has", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await copyPropertyOnEveryPage(world, COPYING)

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`partOfCollectionSlugs: ["salvos"]`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`partOfCollectionSlugs: ["story-read/delve"]`)
})

test("the key written to is put in after the key read from", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await copyPropertyOnEveryPage(world, COPYING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `partOfCollectionSlugs: ["salvos"],\n  storySlug: "salvos",\n  position: 1,`
  )
})

test("a page already with the key written to is passed over rather than refused", async () => {
  const values: Values = new Map([
    [ONE_AT, { partOfCollectionSlugs: ["salvos"], storySlug: "salvos" }],
  ])

  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), COPYING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page with no value under the key read from is passed over rather than refused", async () => {
  const values: Values = new Map([[ONE_AT, { slug: "one" }]])

  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), COPYING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a count handed in holds how many pages the value is written on", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await copyPropertyOnEveryPage(world, { ...COPYING, most: 1 })

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`storySlug: "salvos"`)
  expect(bodies.has(TWO_AT)).toBe(false)
})

test("a list of more than one is refused where the key written to holds one value", async () => {
  const values: Values = new Map([[ONE_AT, { partOfCollectionSlugs: ["salvos", "delve"] }]])

  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), COPYING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("more than one value under `partOfCollectionSlugs`")
})

test("a page type with no property under the key written to is refused", async () => {
  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, [MANY_VALUES]), COPYING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `storySlug`")
})

test("a page type with no property under the key read from is refused", async () => {
  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, [ONE_VALUE]), COPYING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `partOfCollectionSlugs`")
})

test("a page type the index does not name is refused", async () => {
  const said = await copyPropertyOnEveryPage(pagesIn(BODIES, null), COPYING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`story-chapter-read` names no page type")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = await copyPropertyOnEveryPage(pagesIn(held, DECLARED), COPYING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), {
    "page-type": "story-chapter-read",
    from: "partOfCollectionSlugs",
    to: "storySlug",
    most: "none",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no count of pages")
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), { from: "partOfCollectionSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
