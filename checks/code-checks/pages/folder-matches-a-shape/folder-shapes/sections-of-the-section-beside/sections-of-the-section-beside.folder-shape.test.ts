import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.decision.test-fixtures.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { sectionsOfTheSectionBeside } from "./sections-of-the-section-beside.folder-shape.code.ts"

const BOOK_AT = "akasha/alan/books/my-strategy"

const FOLDER = `${BOOK_AT}/sections/safety`

const BOOK = "my-strategy"

const HOLDER = `book-section/${BOOK}/safety`

const BESIDE = "safety.book-section.ts"

const PAGE_TYPES = new Set<string>(["page-type", "alan-book", "book", "book-section"])

const FILE_PROPERTIES = new Set<string>(["chapter-text"])

type Over = {
  readonly holds?: Standing["holds"]
  readonly partOf?: Standing["partOf"]
  readonly above?: readonly string[]
}

function over(said: Over): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    fileProperties: FILE_PROPERTIES,
    extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
    holds: said.holds ?? ((at) => (at === BOOK_AT ? [`alan-book/${BOOK}`] : [])),
    partOf: said.partOf ?? ((): readonly string[] => [BOOK, HOLDER]),
    above: said.above ?? [BESIDE],
  })
}

const folder = over({})

test("the sections of the section beside take the shape", () => {
  const said = sectionsOfTheSectionBeside(folder(["one.book-section.ts", "two.book-section.ts"]))
  expect(said).toEqual([])
})

test("a section carrying its prose beside the section takes the shape", () => {
  const said = sectionsOfTheSectionBeside(
    folder(["one.book-section.ts", "one.book-section.chapter-text.md"])
  )
  expect(said).toEqual([])
})

test("a folder with no book Alan writes above it is refused", () => {
  const said = sectionsOfTheSectionBeside(over({ holds: () => [] })(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("alan-book")
})

test("a folder named for no section beside it is refused", () => {
  const said = sectionsOfTheSectionBeside(over({ above: [] })(["one.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(BESIDE)
})

test("a page that is no book section is refused", () => {
  const said = sectionsOfTheSectionBeside(folder(["one.book-section.ts", "other.book.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("other.book.ts")
})

test("a section naming the book alone is refused, the folder's own section being what holds it", () => {
  const held = over({ partOf: (page) => (page.slug === "two" ? [BOOK] : [BOOK, HOLDER]) })
  const said = sectionsOfTheSectionBeside(held(["one.book-section.ts", "two.book-section.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(HOLDER)
  expect(said[0]).toContain("two.book-section.ts")
})

test("a folder sitting inside takes the shape, a section holding sections of its own", () => {
  const said = sectionsOfTheSectionBeside(folder(["one.book-section.ts"]))
  expect(said).toEqual([])
})

test("a file that is neither a section nor a file beside one is refused", () => {
  const said = sectionsOfTheSectionBeside(folder(["one.book-section.ts", "readme.md"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("readme.md")
})

test("a file sitting beside no section here is refused", () => {
  const said = sectionsOfTheSectionBeside(
    folder(["one.book-section.ts", "ghost.book-section.chapter-text.md"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("ghost.book-section.chapter-text.md")
})

test("a folder named for a section holding no section is refused", () => {
  expect(sectionsOfTheSectionBeside(folder([]))).toEqual(["it holds no section"])
})
