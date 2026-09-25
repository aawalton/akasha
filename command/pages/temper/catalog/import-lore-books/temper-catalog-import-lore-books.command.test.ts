import { expect, test } from "bun:test"
import {
  messageFor,
  taken,
} from "akasha/command/pages/temper/catalog/import-lore-books/temper-catalog-import-lore-books.command.code.ts"

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
