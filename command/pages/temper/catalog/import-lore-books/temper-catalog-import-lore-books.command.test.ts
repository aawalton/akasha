import { expect, test } from "bun:test"
import {
  messageFor,
  rewritten,
  taken,
  withoutIds,
} from "akasha/command/pages/temper/catalog/import-lore-books/temper-catalog-import-lore-books.command.code.ts"

const HELD_ROW = '{"id":"01a0d5e2-ca80-76d7-b046-d2ae292d450f","mapId":1}\n'

const BARE_ROW = '{"mapId":1}\n'

const POSITIONS = "a/one.temper-lore-book.positions.jsonl"

test("a row differing only by the id minted for it is the same row", () => {
  expect(withoutIds(HELD_ROW)).toBe(withoutIds(BARE_ROW))
})

test("rows held with their ids and composed the same again are not written again", () => {
  expect(rewritten(HELD_ROW, { path: POSITIONS, content: BARE_ROW })).toBe(false)
})

test("rows held with no id are written again so they are given their ids", () => {
  expect(rewritten(BARE_ROW, { path: POSITIONS, content: BARE_ROW })).toBe(true)
})

const CALLED = "akasha temper catalog import-lore-books"

test("a call naming no category imports every category", () => {
  expect(taken([], CALLED)).toEqual({ category: null })
})

test("a call names a lore category by the game's number", () => {
  expect(taken(["--lore-category", "2"], CALLED)).toEqual({ category: 2 })
})

test("a category the lore library does not have is refused", () => {
  expect("refused" in taken(["--lore-category", "4"], CALLED)).toBe(true)
})

test("the commit names the collection whose books it makes pages of", () => {
  const collection = {
    slug: "dwemer",
    category: 1,
    index: 12,
    name: "Dwemer",
    values: {},
    books: [],
  }
  expect(messageFor(collection)).toBe("make a page of each lore book of Dwemer")
})

test("a collection with no name is named by its slug", () => {
  const collection = {
    slug: "crafting-motifs-3",
    category: 2,
    index: 3,
    name: "",
    values: {},
    books: [],
  }
  expect(messageFor(collection)).toBe("make a page of each lore book of crafting-motifs-3")
})
