import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import {
  type NextCharacterInput,
  resolveNextCharacter,
} from "./completion-next-character.module.code.ts"

const CARD = "lore-library-character"
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

function mkChar(
  id: string,
  sortOrder: number | null,
  loreLibrary: CharacterCompletion["loreLibrary"]
): NextCharacterInput {
  return { id, name: id, sortOrder, completion: { loreLibrary } }
}

describe("resolveNextCharacter — lore-library with sparse data (Shalidor's Library)", () => {
  test("skips a sortOrder-1 character that is complete and returns the next incomplete one", () => {
    const erin = mkChar("erin", 1, sparseComplete(CATEGORY))
    const maviola = mkChar("maviola", 2, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([erin, maviola], CARD, [CATEGORY])
    expect(result?.characterId).toBe("maviola")
  })

  test("returns null when every character is complete for the category", () => {
    const a = mkChar("a", 1, sparseComplete(CATEGORY))
    const b = mkChar("b", 2, sparseComplete(CATEGORY))
    expect(resolveNextCharacter([a, b], CARD, [CATEGORY])).toBeNull()
  })
})

describe("resolveNextCharacter — the order the roster is walked in", () => {
  test("walks by sort order rather than by the order the roster is given in", () => {
    const later = mkChar("later", 2, sparseMissingOne(CATEGORY))
    const earlier = mkChar("earlier", 1, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([later, earlier], CARD, [CATEGORY])
    expect(result?.characterId).toBe("earlier")
  })

  test("orders a character naming no sort order after every character that names one", () => {
    const unordered = mkChar("unordered", null, sparseMissingOne(CATEGORY))
    const ordered = mkChar("ordered", 9000, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([unordered, ordered], CARD, [CATEGORY])
    expect(result?.characterId).toBe("ordered")
  })

  test("breaks a tie on sort order by name", () => {
    const zeta = mkChar("zeta", 1, sparseMissingOne(CATEGORY))
    const alpha = mkChar("alpha", 1, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([zeta, alpha], CARD, [CATEGORY])
    expect(result?.characterId).toBe("alpha")
  })

  test("names the character as well as the id", () => {
    const only = mkChar("solo", 1, sparseMissingOne(CATEGORY))
    expect(resolveNextCharacter([only], CARD, [CATEGORY])).toEqual({
      characterId: "solo",
      characterName: "solo",
    })
  })
})

describe("resolveNextCharacter — cards with no checker", () => {
  test("returns null for a card no checker names", () => {
    const only = mkChar("solo", 1, sparseMissingOne(CATEGORY))
    expect(resolveNextCharacter([only], "guild-sales", [CATEGORY])).toBeNull()
  })

  test("returns null for an empty roster", () => {
    expect(resolveNextCharacter([], CARD, [CATEGORY])).toBeNull()
  })
})
