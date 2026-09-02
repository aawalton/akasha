import { describe, expect, test } from "bun:test"
import type {
  CharacterCompletion,
  LoreCategory,
} from "@akasha/temper-completion/completion-progress"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import {
  extractLoreKnownSet,
  isLoreLibraryItemComplete,
} from "./completion-lore-library-progress.module.code.ts"

const CATEGORY = 1

function sparseComplete(categoryIndex: number): Record<number, Record<number, number[]>> {
  const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === categoryIndex)
  if (!category) throw new Error(`no lore category ${categoryIndex}`)
  const collections: Record<number, number[]> = {}
  for (const collection of category.collections) {
    collections[collection.collectionIndex] = collection.books.map((book) => book.bookIndex)
  }
  return { [categoryIndex]: collections }
}

function sparseMissingOne(categoryIndex: number): Record<number, Record<number, number[]>> {
  const library = sparseComplete(categoryIndex)
  const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === categoryIndex)
  if (!category) throw new Error(`no lore category ${categoryIndex}`)
  const firstCollection = category.collections[0]
  if (!firstCollection) throw new Error("category has no collections")
  const collections = library[categoryIndex]
  if (!collections) throw new Error("sparse build missing category")
  const books = collections[firstCollection.collectionIndex]
  if (!books) throw new Error("sparse build missing collection")
  collections[firstCollection.collectionIndex] = books.slice(1)
  return library
}

describe("isLoreLibraryItemComplete over the sparse wire format", () => {
  test("returns true when every book in the category is known", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(true)
  })

  test("returns false when one book in the category is missing", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseMissingOne(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(false)
  })

  test("returns false for null completion or absent loreLibrary", () => {
    expect(isLoreLibraryItemComplete(null, [CATEGORY])).toBe(false)
    expect(isLoreLibraryItemComplete({}, [CATEGORY])).toBe(false)
  })

  test("returns false for an empty item path", () => {
    const completion: CharacterCompletion = { loreLibrary: sparseComplete(CATEGORY) }
    expect(isLoreLibraryItemComplete(completion, [])).toBe(false)
  })

  test("still handles the rich format, where every book known reads as complete", () => {
    const category = LORE_LIBRARY_DATA.find((entry) => entry.categoryIndex === CATEGORY)
    if (!category) throw new Error("missing category")
    const collections: LoreCategory["collections"] = {}
    for (const collection of category.collections) {
      const books: LoreCategory["collections"][number]["books"] = {}
      for (const book of collection.books) books[book.bookIndex] = { name: book.name, known: true }
      collections[collection.collectionIndex] = { name: collection.name, books }
    }
    const completion: CharacterCompletion = {
      loreLibrary: { [CATEGORY]: { name: category.name, collections } },
    }
    expect(isLoreLibraryItemComplete(completion, [CATEGORY])).toBe(true)
  })
})

describe("extractLoreKnownSet", () => {
  test("extracts category-collection-book keys from the sparse array format", () => {
    const known = extractLoreKnownSet({ 1: { 2: [3, 4] } })
    expect(known.has("1:2:3")).toBe(true)
    expect(known.has("1:2:4")).toBe(true)
    expect(known.has("1:2:5")).toBe(false)
  })
})
