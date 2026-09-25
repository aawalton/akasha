import { afterAll, expect, test } from "bun:test"
import { alanBook } from "akasha/alan/book/alan-book.page-type.ts"
import { bookSection } from "akasha/alan/collection/reading/book-section/book-section.page-type.ts"
import {
  joined,
  pointBookLinksAtSections,
  pointedIn,
  sectionsIn,
} from "akasha/change/agent/file-content/point-book-links-at-sections/point-book-links-at-sections.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  put,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

afterAll(scratch.sweep)

const BOOK = "one"

const IN_BOOK = namedAs(alanBook.slug, BOOK, null)

function addressOf(slug: string): string {
  return namedAs(bookSection.slug, slug, BOOK)
}

const SECTIONS = "akasha/book/one/sections"

const ALPHA_PAGE = `${SECTIONS}/alpha.${bookSection.slug}.ts`

const ALPHA_TEXT = `${SECTIONS}/alpha.${bookSection.slug}.chapter-text.md`

const BETA_PAGE = `${SECTIONS}/notes/beta.${bookSection.slug}.ts`

const GAMMA_PAGE = `${SECTIONS}/notes/gamma.${bookSection.slug}.ts`

const NUMBERED_PAGE = `${SECTIONS}/notes/book-chapter-001-delta.${bookSection.slug}.ts`

const FAMILY_PAGE = `${SECTIONS}/eu-citizenship-estonia.${bookSection.slug}.ts`

const FAMILY_TEXT = `${SECTIONS}/eu-citizenship-estonia.${bookSection.slug}.chapter-text.md`

const KIN_PAGE = `${SECTIONS}/eu-residency-estonia.${bookSection.slug}.ts`

const FLAT_PAGE = `${SECTIONS}/eu-residency-summary.${bookSection.slug}.ts`

const WHOLE_PAGE = `${SECTIONS}/legible-numbers.${bookSection.slug}.ts`

const TWIN_PAGE = `${SECTIONS}/other/gamma.${bookSection.slug}.ts`

const PAGES: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  [ALPHA_PAGE]: { slug: "alpha", sectionOf: IN_BOOK },
  [BETA_PAGE]: { slug: "beta", sectionOf: IN_BOOK },
  [GAMMA_PAGE]: { slug: "gamma", sectionOf: IN_BOOK },
  [NUMBERED_PAGE]: { slug: "book-chapter-001-delta", sectionOf: IN_BOOK },
  [FAMILY_PAGE]: { slug: "eu-citizenship-estonia", sectionOf: IN_BOOK },
  [KIN_PAGE]: { slug: "eu-residency-estonia", sectionOf: IN_BOOK },
  [FLAT_PAGE]: { slug: "eu-residency-summary", sectionOf: IN_BOOK },
  [WHOLE_PAGE]: { slug: "legible-numbers", sectionOf: IN_BOOK },
}

const TWINNED: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  ...PAGES,
  [TWIN_PAGE]: { slug: "gamma", sectionOf: addressOf("alpha") },
}

function worldOver(
  held: Readonly<Record<string, string>>,
  pages: Readonly<Record<string, Readonly<Record<string, string>>>>
): World {
  const root = scratch.rootFor("point-book-links-at-sections-")
  for (const [at, body] of Object.entries(held)) put(root, at, body)
  const index = {
    everyOfType: () => Object.keys(pages).map((path) => ({ path, id: path })),
    pageByPath: (path: string) => pages[path] ?? null,
    pageTypesIn: () => new Set<string>(),
  } as never
  return {
    root,
    index,
    textOf: (path: string) => held[path] ?? null,
    bodyOf: (path: string) => held[path] ?? null,
    under: () => [],
    base: (path: string) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: running,
  }
}

test("a link whose path reaches a section page is pointed at that section's address", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(sectionsIn(world), ALPHA_TEXT, "see [beta](notes/beta.book-chapter.md)\n")

  expect(said).toBe(`see [beta](${addressOf("beta")})\n`)
})

test("the anchor a link carries is kept on the address that link becomes", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(
    sectionsIn(world),
    ALPHA_TEXT,
    "see [beta](notes/beta.book-chapter.md#deep)\n"
  )

  expect(said).toBe(`see [beta](${addressOf("beta")}#deep)\n`)
})

test("a path reaching no page is answered by the one section of that book with that name", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(sectionsIn(world), ALPHA_TEXT, "see [gamma](gone/gamma.book-chapter.md)\n")

  expect(said).toBe(`see [gamma](${addressOf("gamma")})\n`)
})

test("a name fitting more than one section of that book leaves its link alone", () => {
  const world = worldOver({}, TWINNED)

  expect(
    pointedIn(sectionsIn(world), ALPHA_TEXT, "see [gamma](gone/gamma.book-chapter.md)\n")
  ).toBeNull()
})

test("a body holding no such link is answered as nothing to write", () => {
  const world = worldOver({}, PAGES)

  expect(pointedIn(sectionsIn(world), ALPHA_TEXT, "see [beta](notes/beta.md)\n")).toBeNull()
})

test("a name reaching no section is tried again under the chapter prefix", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(
    sectionsIn(world),
    ALPHA_TEXT,
    "see [delta](notes/001-delta.book-chapter.md)\n"
  )

  expect(said).toBe(`see [delta](${addressOf("book-chapter-001-delta")})\n`)
})

test("a chain of folders is tried as one name joined the way a slug joins words", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(
    sectionsIn(world),
    ALPHA_TEXT,
    "see [s](eu-residency/summary.book-chapter.md)\n"
  )

  expect(said).toBe(`see [s](${addressOf("eu-residency-summary")})\n`)
})

test("a link climbing out is read against the folders its own name was flattened out of", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(
    sectionsIn(world),
    FAMILY_TEXT,
    "see [e](../residency/estonia.book-chapter.md)\n"
  )

  expect(said).toBe(`see [e](${addressOf("eu-residency-estonia")})\n`)
})

test("a name opening with a number is tried with that number taken off", () => {
  const world = worldOver({}, PAGES)

  const said = pointedIn(
    sectionsIn(world),
    ALPHA_TEXT,
    "see [n](../001-legible-numbers.book-chapter.md)\n"
  )

  expect(said).toBe(`see [n](${addressOf("legible-numbers")})\n`)
})

test("a path climbing out of its folder reaches the folder above", () => {
  expect(joined("one/two/three", "../four")).toBe("one/two/four")
})

test("a run capped at no file points no link", async () => {
  const world = worldOver({ [ALPHA_TEXT]: "see [beta](notes/beta.book-chapter.md)\n" }, PAGES)

  expect((await pointBookLinksAtSections(world, 0)).edits).toEqual([])
})
