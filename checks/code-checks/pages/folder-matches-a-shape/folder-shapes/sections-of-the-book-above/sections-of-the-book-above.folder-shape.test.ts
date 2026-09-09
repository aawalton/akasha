import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { sectionsOfTheBookAbove } from "./sections-of-the-book-above.folder-shape.code.ts"

const ABOVE = "akasha/alan/books/my-strategy"

const FOLDER = `${ABOVE}/sections`

const BOOK = "my-strategy"

const PAGE_TYPES = new Set<string>(["page-type", "alan-book", "book", "book-section"])

const FILE_PROPERTIES = new Set<string>(["chapter-text"])

type Over = {
  readonly deep?: readonly string[]
  readonly holds?: Standing["holds"]
  readonly partOf?: Standing["partOf"]
}

function over(said: Over): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    fileProperties: FILE_PROPERTIES,
    extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
    holds: said.holds ?? ((at) => (at === ABOVE ? [`alan-book/${BOOK}`] : [])),
    partOf: said.partOf ?? ((): readonly string[] => [BOOK]),
    deep: said.deep ?? [],
  })
}

const folder = over({})

test("sections of the book above sitting as flat files take the shape", () => {
  expect(sectionsOfTheBookAbove(folder(["one.book-section.ts", "two.book-section.ts"]))).toEqual([])
})

test("a section carrying its prose beside the section takes the shape", () => {
  const said = sectionsOfTheBookAbove(
    folder(["one.book-section.ts", "one.book-section.chapter-text.md"])
  )
  expect(said).toEqual([])
})

test("a folder above holding no page of its own is refused", () => {
  const held = over({ holds: () => [] })
  const said = sectionsOfTheBookAbove(held(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("holds no page of its own")
})

test("a folder above holding a page that is no book Alan writes is refused", () => {
  const held = over({ holds: (at) => (at === ABOVE ? ["book/plato-apology-crito"] : []) })
  const said = sectionsOfTheBookAbove(held(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`book`")
  expect(said[0]).toContain("`alan-book`")
})

test("a page that is no book section is refused", () => {
  const said = sectionsOfTheBookAbove(folder(["one.book-section.ts", "other.book.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`book-section`")
  expect(said[0]).toContain("other.book.ts")
})

test("a section naming another book is refused", () => {
  const held = over({ partOf: (page) => (page.slug === "two" ? ["my-math"] : [BOOK]) })
  const said = sectionsOfTheBookAbove(held(["one.book-section.ts", "two.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${BOOK}\``)
  expect(said[0]).toContain("two.book-section.ts")
})

test("a folder sitting inside sections takes the shape, a section holding sections of its own", () => {
  const held = over({ deep: ["sources/three.book-section.ts"] })
  expect(sectionsOfTheBookAbove(held(["one.book-section.ts"]))).toEqual([])
})

test("a file that is neither a section nor a file beside one is refused", () => {
  const said = sectionsOfTheBookAbove(folder(["one.book-section.ts", "readme.md"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("readme.md")
})

test("a file sitting beside no section here is refused", () => {
  const said = sectionsOfTheBookAbove(
    folder(["one.book-section.ts", "ghost.book-section.chapter-text.md"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("ghost.book-section.chapter-text.md")
})

test("a folder named sections holding no section is refused", () => {
  expect(sectionsOfTheBookAbove(folder([]))).toEqual(["it holds no section"])
})
