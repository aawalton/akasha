import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { chaptersOfTheBookAbove } from "./chapters-of-the-book-above.folder-shape.code.ts"

const ABOVE = "akasha/alan/books/my-strategy"

const FOLDER = `${ABOVE}/chapters`

const BOOK = "my-strategy"

const PAGE_TYPES = new Set<string>(["page-type", "alan-book", "book", "book-chapter"])

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
    holds: said.holds ?? ((at) => (at === ABOVE ? `alan-book/${BOOK}` : null)),
    partOf: said.partOf ?? ((): readonly string[] => [BOOK]),
    deep: said.deep ?? [],
  })
}

const folder = over({})

test("chapters of the book above sitting as flat files take the shape", () => {
  expect(chaptersOfTheBookAbove(folder(["one.book-chapter.ts", "two.book-chapter.ts"]))).toEqual([])
})

test("a chapter carrying its prose beside the chapter takes the shape", () => {
  const said = chaptersOfTheBookAbove(
    folder(["one.book-chapter.ts", "one.book-chapter.chapter-text.md"])
  )
  expect(said).toEqual([])
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const held = over({})
  const said = chaptersOfTheBookAbove(
    folderFrom({
      folder: `${ABOVE}/parts`,
      pageTypes: PAGE_TYPES,
      fileProperties: FILE_PROPERTIES,
      extending: (pageTypeSlug, wanted) => pageTypeSlug === wanted,
      holds: (at) => (at === ABOVE ? `alan-book/${BOOK}` : null),
      partOf: (): readonly string[] => [BOOK],
    })(["one.book-chapter.ts"])
  )
  expect(held).toBeDefined()
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`parts`")
  expect(said[0]).toContain("`chapters`")
})

test("a folder above holding no page of its own is refused", () => {
  const held = over({ holds: () => null })
  const said = chaptersOfTheBookAbove(held(["one.book-chapter.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("holds no page of its own")
})

test("a folder above holding a page that is no book Alan writes is refused", () => {
  const held = over({ holds: (at) => (at === ABOVE ? "book/plato-apology-crito" : null) })
  const said = chaptersOfTheBookAbove(held(["one.book-chapter.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`book`")
  expect(said[0]).toContain("`alan-book`")
})

test("a page that is no book chapter is refused", () => {
  const said = chaptersOfTheBookAbove(folder(["one.book-chapter.ts", "other.book.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`book-chapter`")
  expect(said[0]).toContain("other.book.ts")
})

test("a chapter naming another book is refused", () => {
  const held = over({ partOf: (page) => (page.slug === "two" ? ["my-math"] : [BOOK]) })
  const said = chaptersOfTheBookAbove(held(["one.book-chapter.ts", "two.book-chapter.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${BOOK}\``)
  expect(said[0]).toContain("two.book-chapter.ts")
})

test("a folder sitting inside chapters is refused", () => {
  const held = over({ deep: ["sources/three.book-chapter.ts"] })
  const said = chaptersOfTheBookAbove(held(["one.book-chapter.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("sources")
})

test("a file that is neither a chapter nor a file beside one is refused", () => {
  const said = chaptersOfTheBookAbove(folder(["one.book-chapter.ts", "readme.md"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("readme.md")
})

test("a file sitting beside no chapter here is refused", () => {
  const said = chaptersOfTheBookAbove(
    folder(["one.book-chapter.ts", "ghost.book-chapter.chapter-text.md"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("ghost.book-chapter.chapter-text.md")
})

test("a folder named chapters holding no chapter is refused", () => {
  expect(chaptersOfTheBookAbove(folder([]))).toEqual(["it holds no chapter"])
})
