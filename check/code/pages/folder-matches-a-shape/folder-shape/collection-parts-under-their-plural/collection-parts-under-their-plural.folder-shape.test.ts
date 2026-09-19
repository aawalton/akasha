import { expect, test } from "bun:test"
import { alanBook } from "akasha/alan/book/alan-book.page-type.ts"
import { myMath } from "akasha/alan/book/pages/my-math/my-math.alan-book.ts"
import { myStrategy } from "akasha/alan/book/pages/my-strategy/my-strategy.alan-book.ts"
import {
  folderFrom,
  gatheringFrom,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import { collectionPartsUnderTheirPlural } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/collection-parts-under-their-plural/collection-parts-under-their-plural.folder-shape.code.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"

const ABOVE = "akasha/alan/book/my-strategy"

const FOLDER = `${ABOVE}/sections`

const BOOK = `${alanBook.slug}/${myStrategy.slug}` as const

const MATH = `${alanBook.slug}/${myMath.slug}` as const

const PAGE_TYPES = new Set<string>(["alan-book", "book", "book-section"])

const FILE_PROPERTIES = new Set<string>(["chapter-text"])

const gathered = gatheringFrom({ sections: ["book-section"] })

type Over = {
  readonly folder?: string
  readonly deep?: readonly string[]
  readonly holds?: Standing["holds"]
  readonly partOf?: Standing["partOf"]
}

function over(said: Over): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: said.folder ?? FOLDER,
    pageTypes: PAGE_TYPES,
    fileProperties: FILE_PROPERTIES,
    extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
    gathered,
    holds: said.holds ?? ((at) => (at === ABOVE ? [BOOK] : [])),
    partOf: said.partOf ?? ((): readonly string[] => [BOOK]),
    deep: said.deep ?? [],
  })
}

const folder = over({})

test("the sections of the book above take the shape", () => {
  const said = collectionPartsUnderTheirPlural(
    folder(["one.book-section.ts", "two.book-section.ts"])
  )
  expect(said).toEqual([])
})

test("a section carrying its prose beside the section takes the shape", () => {
  const said = collectionPartsUnderTheirPlural(
    folder(["one.book-section.ts", "one.book-section.chapter-text.md"])
  )
  expect(said).toEqual([])
})

test("a folder named no page type's plural is refused, and the reason names it", () => {
  const held = over({ folder: `${ABOVE}/widgets` })
  const said = collectionPartsUnderTheirPlural(held(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("widgets")
})

test("a folder above holding no page of its own is refused", () => {
  const held = over({ holds: () => [] })
  const said = collectionPartsUnderTheirPlural(held(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("holds no page of its own")
})

test("a page gathered under another name is refused", () => {
  const said = collectionPartsUnderTheirPlural(folder(["one.book-section.ts", "other.book.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("other.book.ts")
})

test("a section naming another collection is refused", () => {
  const held = over({
    partOf: (page) => (page.slug === "two" ? [MATH] : [BOOK]),
  })
  const said = collectionPartsUnderTheirPlural(held(["one.book-section.ts", "two.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${BOOK}\``)
  expect(said[0]).toContain("two.book-section.ts")
})

test("the address the pages here name is the one held, of the two the page above answers with", () => {
  const held = over({ holds: (at) => (at === ABOVE ? ["domain/my-strategy", BOOK] : []) })
  expect(collectionPartsUnderTheirPlural(held(["one.book-section.ts"]))).toEqual([])
})

test("a folder sitting inside takes the shape, a section holding sections of its own", () => {
  const held = over({ deep: ["safety/three.book-section.ts"] })
  expect(collectionPartsUnderTheirPlural(held(["one.book-section.ts"]))).toEqual([])
})

test("a file that is neither a page nor a file beside one is refused", () => {
  const said = collectionPartsUnderTheirPlural(folder(["one.book-section.ts", "readme.md"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("readme.md")
})

test("a file sitting beside no page here is refused", () => {
  const said = collectionPartsUnderTheirPlural(
    folder(["one.book-section.ts", "ghost.book-section.chapter-text.md"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("ghost.book-section.chapter-text.md")
})

test("a folder gathering no page is refused", () => {
  expect(collectionPartsUnderTheirPlural(folder([]))).toEqual(["it holds no page"])
})
