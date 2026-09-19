import { expect, test } from "bun:test"
import {
  movePropertyOnEveryPage,
  runChange,
} from "akasha/change/agent/page-type/move-property-on-every-page/move-property-on-every-page.change-agent.code.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { movePropertyOnEveryPage as movePropertyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/move/move-property-on-every-page/move-property-on-every-page.change-mechanical-page-type.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import {
  listing,
  running,
} from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { worldOfType } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const ONE_AT = "thrumming/chapters/pages/one.story-chapter-read.ts"

const TWO_AT = "thrumming/chapters/pages/two.story-chapter-read.ts"

const TYPE_AT = "thrumming/chapters/story-chapter-read.page-type.ts"

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
  return worldOfType(MOVING.pageType, bodies, carried, values, running)
}

const MOVING = {
  pageType: "story-chapter-read",
  from: "partOfCollectionSlugs",
  to: "storySlug",
}

test("every page of the page type has the value under the key written to", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertyOnEveryPage(world, MOVING)

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`storySlug: "salvos"`)
  expect(bodies.get(TWO_AT) ?? "").toContain(`storySlug: "story-read/delve"`)
})

test("the key read from is taken away", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertyOnEveryPage(world, MOVING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").not.toContain("partOfCollectionSlugs")
})

test("the key written to takes the place the key read from held", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertyOnEveryPage(world, MOVING)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `slug: "one",\n  storySlug: "salvos",\n  position: 1,`
  )
})

test("a list of one becomes one value where the key written to holds one value", () => {
  expect(spelledAs(["salvos"], false)).toBe(`"salvos"`)
})

test("a list is left a list where the key written to holds many values", () => {
  expect(spelledAs(["salvos"], true)).toBe(`["salvos"]`)
})

test("a list of more than one is refused where the key written to holds one value", async () => {
  const values: Values = new Map([[ONE_AT, { partOfCollectionSlugs: ["salvos", "delve"] }]])

  const said = await movePropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), MOVING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("more than one value under `partOfCollectionSlugs`")
})

test("a page already with the key written to is passed over rather than refused", async () => {
  const values: Values = new Map([
    [ONE_AT, { partOfCollectionSlugs: ["salvos"], storySlug: "salvos" }],
  ])

  const said = await movePropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), MOVING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a page with no value under the key read from is passed over rather than refused", async () => {
  const values: Values = new Map([[ONE_AT, { slug: "one" }]])

  const said = await movePropertyOnEveryPage(pagesIn(BODIES, DECLARED, values), MOVING)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a count handed in holds how many pages the value is moved on", async () => {
  const world = pagesIn(BODIES, DECLARED)

  const said = await movePropertyOnEveryPage(world, { ...MOVING, atMost: 1 })

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").toContain(`storySlug: "salvos"`)
  expect(bodies.has(TWO_AT)).toBe(false)
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), {
    "page-type": "story-chapter-read",
    from: "partOfCollectionSlugs",
    to: "storySlug",
    "at-most": "none",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no count of pages")
})

test("a page type with no property under the key written to is refused", async () => {
  const said = await movePropertyOnEveryPage(pagesIn(BODIES, [MANY_VALUES]), MOVING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `storySlug`")
})

test("a page type with no property under the key read from is refused", async () => {
  const said = await movePropertyOnEveryPage(pagesIn(BODIES, [ONE_VALUE]), MOVING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("has no property under `partOfCollectionSlugs`")
})

test("a page type the index does not name is refused", async () => {
  const said = await movePropertyOnEveryPage(pagesIn(BODIES, null), MOVING)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`story-chapter-read` names no page type")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = await movePropertyOnEveryPage(pagesIn(held, DECLARED), MOVING)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(pagesIn(BODIES, DECLARED), { from: "partOfCollectionSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})

test("the one change reached is the mechanical change acting on a page type", async () => {
  const seen: string[] = []
  const world = worldOfType(MOVING.pageType, BODIES, DECLARED, VALUES, listing(seen))

  await movePropertyOnEveryPage(world, MOVING)

  expect(seen).toEqual([
    `${changeMechanicalPageType.slug}/${movePropertyOnEveryPageMechanical.slug}`,
  ])
})
