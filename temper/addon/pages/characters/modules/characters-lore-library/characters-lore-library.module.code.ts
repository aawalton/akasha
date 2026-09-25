import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { addIdToListAt } from "akasha/temper/addon/pages/characters/modules/characters-known-id-lists/characters-known-id-lists.module.code.ts"
import type { SparseLoreLibrary } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"

export function collectLoreLibrary(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const loreLibrary: SparseLoreLibrary = {}

  for (let categoryIndex = 1; categoryIndex <= GetNumLoreCategories(); categoryIndex++) {
    const [, numCollections] = GetLoreCategoryInfo(categoryIndex)

    const collections: Record<number, number[]> = {}

    for (let collectionIndex = 1; collectionIndex <= numCollections; collectionIndex++) {
      const [collectionName, , , totalBooksInCollection] = GetLoreCollectionInfo(
        categoryIndex,
        collectionIndex
      )

      if (collectionName === "") continue

      const knownBooks: number[] = []

      for (let bookIndex = 1; bookIndex <= totalBooksInCollection; bookIndex++) {
        const [, , known] = GetLoreBookInfo(categoryIndex, collectionIndex, bookIndex)

        if (known) {
          knownBooks.push(bookIndex)
        }
      }

      if (knownBooks.length > 0) {
        collections[collectionIndex] = knownBooks
      }
    }

    if (Object.keys(collections).length > 0) {
      loreLibrary[categoryIndex] = collections
    }
  }

  charEntry.loreLibrary = loreLibrary
}

export function updateLoreBook(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  const loreLibrary = charEntry.loreLibrary
  if (loreLibrary === undefined) return

  let collections = loreLibrary[categoryIndex]
  if (collections === undefined) {
    collections = {}
    loreLibrary[categoryIndex] = collections
  }

  addIdToListAt(collections, collectionIndex, bookIndex)
}
