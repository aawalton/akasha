import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import { runChange as addKey } from "../../../mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.code.ts"
import { runChange as restate } from "../../../mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  addCopiedPropertyToEveryPage,
  runChange,
} from "./add-copied-property-to-every-page.change-agent.code.ts"

const REACHES: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/add-page-property") {
    return Promise.resolve(addKey(world, given as Parameters<typeof addKey>[1]))
  }
  if (at === "change-mechanical-file-content/change-file-content") {
    return Promise.resolve(restate(world, given as Parameters<typeof restate>[1]))
  }
  return Promise.resolve(refusing(`nothing here reaches \`${at}\``))
}

const ONE_AT = "alan/books/solar/pricing.book-section.ts"

const TWO_AT = "alan/books/solar/solar-power.book-section.ts"

function sectioned(name: string, slug: string, named: string): string {
  return `export const ${name} = {
  pageTypeSlug: "book-section",
  title: "A Section",
  slug: "${slug}",
  partOfSlugs: ["${named}"],
}
`
}

const PAGES = {
  [ONE_AT]: sectioned("pricing", "pricing", "solar-power"),
  [TWO_AT]: sectioned("solarPower", "solar-power", "my-projects"),
}

const SINGLE: Carried = {
  pagePropertySlug: "section-of-slug",
  pageTypeSlug: "relation-property",
  propertySlug: "section-of-slug",
  key: "sectionOfSlug",
  unique: null,
  declaredBy: "book-section",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

function sectionsIn(
  pages: Readonly<Record<string, string>>,
  carried: readonly Carried[] | null
): World {
  const index = {
    everyOfType: () => Object.keys(pages).map((path) => ({ path, id: path })),
    propertiesIfNamed: () => carried,
  }
  return { ...worldOf(pages), index: index as never, reaching: REACHES }
}

const COPIED = { pageType: "book-section", from: "partOfSlugs", key: "sectionOfSlug" }

test("a value naming a page of another type is written as that page's slug alone", async () => {
  const world = sectionsIn(PAGES, [SINGLE])

  const said = await addCopiedPropertyToEveryPage(world, COPIED)

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(TWO_AT) ?? "").toContain(`sectionOfSlug: "my-projects"`)
})

test("a value naming a page of the same page type carries that page's own scope", async () => {
  const world = sectionsIn(PAGES, [SINGLE])

  const said = await addCopiedPropertyToEveryPage(world, COPIED)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `sectionOfSlug: "book-section/my-projects/solar-power"`
  )
})

test("the key copied from is restated where the scope changes what it names", async () => {
  const world = sectionsIn(PAGES, [SINGLE])

  const said = await addCopiedPropertyToEveryPage(world, COPIED)

  expect(bodiesIn(said, world.base).get(ONE_AT) ?? "").toContain(
    `partOfSlugs: ["book-section/my-projects/solar-power"]`
  )
  expect(bodiesIn(said, world.base).get(TWO_AT) ?? "").toContain(`partOfSlugs: ["my-projects"]`)
})

test("the key is written after the property `after` names", async () => {
  const world = sectionsIn(PAGES, [SINGLE])

  const said = await addCopiedPropertyToEveryPage(world, { ...COPIED, after: "title" })

  expect(bodiesIn(said, world.base).get(TWO_AT) ?? "").toContain(
    `title: "A Section",\n  sectionOfSlug: "my-projects",`
  )
})

test("a page carrying more than one value under the key copied from is refused", async () => {
  const held = { [ONE_AT]: sectioned("pricing", "pricing", `solar-power", "my-faith`) }

  const said = await addCopiedPropertyToEveryPage(sectionsIn(held, [SINGLE]), COPIED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("carries other than one value under `partOfSlugs`")
})

test("a page carrying nothing under the key copied from is refused, and the refusal names it", async () => {
  const held = { [ONE_AT]: `export const pricing = { slug: "pricing" }\n` }

  const said = await addCopiedPropertyToEveryPage(sectionsIn(held, [SINGLE]), COPIED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
})

test("a key its page type says carries many values is refused", async () => {
  const many = [{ ...SINGLE, key: "partOfSlugs", many: true }]

  const said = await addCopiedPropertyToEveryPage(sectionsIn(PAGES, many), {
    ...COPIED,
    key: "partOfSlugs",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carries many values/)
})

test("a page type the index does not name is refused", async () => {
  const said = await addCopiedPropertyToEveryPage(sectionsIn(PAGES, null), COPIED)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(sectionsIn(PAGES, [SINGLE]), { "page-type": "book-section" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`from` names what this change is handed/)
})
