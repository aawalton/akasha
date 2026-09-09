import { expect, test } from "bun:test"
import type { Carried } from "@akasha/pages/page-type-properties"
import { runChange as dropKey } from "../../../mechanical/file-content/remove/remove-page-property/remove-page-property.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "../../../modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  removePropertyFromEveryPage,
  runChange,
} from "./remove-property-from-every-page.change-agent.code.ts"

const REACHES: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file-content/remove-page-property") {
    return Promise.resolve(dropKey(world, given as Parameters<typeof dropKey>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ONE_AT = "alan/books/one.book-section.ts"

const TWO_AT = "alan/books/two.book-section.ts"

const TYPE_AT = "alan/books/book-section.page-type.ts"

const TYPED = `export type BookSection = {
  pageTypeSlug: string
  slug: string
  sectionOfSlug?: string
  partOfSlugs?: readonly string[]
}
`

function sectionAt(slug: string): string {
  return `import type { BookSection } from "./book-section.page-type.ts"

export const ${slug} = {
  pageTypeSlug: "book-section",
  slug: "${slug}",
  sectionOfSlug: "solar-power",
  partOfSlugs: ["alpha", "beta"],
} as const satisfies BookSection
`
}

type Files = Readonly<Record<string, string>>

const BODIES: Files = {
  [ONE_AT]: sectionAt("one"),
  [TWO_AT]: sectionAt("two"),
  [TYPE_AT]: TYPED,
}

const DECLARED: Carried = {
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

const SLUG: Carried = { ...DECLARED, key: "slug", required: true }

function worldFor(bodies: Files, carried: readonly Carried[] | null, listed: string[]): World {
  const index = {
    everyOfType: () => listed.map((path) => ({ path, id: path })),
    propertiesIfNamed: () => carried,
  }
  return { ...worldOf(bodies), index: index as never, reaching: REACHES }
}

const EVERY = [ONE_AT, TWO_AT]

test("every page of the page type loses the key", async () => {
  const world = worldFor(BODIES, [DECLARED], EVERY)

  const said = await removePropertyFromEveryPage(world, {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.refused).toBeNull()
  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").not.toContain("sectionOfSlug")
  expect(bodies.get(TWO_AT) ?? "").not.toContain("sectionOfSlug")
  expect(bodies.get(ONE_AT) ?? "").toContain(`slug: "one",`)
})

test("a key holding many values goes with every value that key holds", async () => {
  const world = worldFor(BODIES, [{ ...DECLARED, key: "partOfSlugs", many: true }], EVERY)

  const said = await removePropertyFromEveryPage(world, {
    pageType: "book-section",
    key: "partOfSlugs",
  })

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(ONE_AT) ?? "").not.toContain("partOfSlugs")
  expect(bodies.get(ONE_AT) ?? "").not.toContain("alpha")
})

test("a page already stating no such key answers no edit while the rest lose it", async () => {
  const bare = sectionAt("two").replace(`  sectionOfSlug: "solar-power",\n`, "")
  const world = worldFor({ ...BODIES, [TWO_AT]: bare }, [DECLARED], EVERY)

  const said = await removePropertyFromEveryPage(world, {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([ONE_AT])
})

test("a page type carrying no property under the key is refused", async () => {
  const said = await removePropertyFromEveryPage(worldFor(BODIES, [], EVERY), {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carries no property under `sectionOfSlug`/)
})

test("a page type the index does not name is refused", async () => {
  const said = await removePropertyFromEveryPage(worldFor(BODIES, null, EVERY), {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`book-section` names no page type")
})

test("a page type no page is of is refused rather than answered as no edit", async () => {
  const said = await removePropertyFromEveryPage(worldFor(BODIES, [DECLARED], []), {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page is a `book-section`")
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { ...BODIES, [TWO_AT]: "const two = 1\n" }

  const said = await removePropertyFromEveryPage(worldFor(held, [DECLARED], EVERY), {
    pageType: "book-section",
    key: "sectionOfSlug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(TWO_AT)
  expect(said.refused ?? "").toContain("exports no object")
})

test("a key the pages' type requires is refused rather than taken away", async () => {
  const said = await removePropertyFromEveryPage(worldFor(BODIES, [SLUG], EVERY), {
    pageType: "book-section",
    key: "slug",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(ONE_AT)
  expect(said.refused ?? "").toContain("is required, so taking it away is a retype")
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldFor(BODIES, [DECLARED], EVERY), { key: "sectionOfSlug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`page-type` names what this change is handed/)
})
