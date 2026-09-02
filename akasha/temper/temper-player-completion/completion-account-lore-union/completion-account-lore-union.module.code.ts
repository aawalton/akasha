import type { LoreCategory } from "@akasha/temper-completion/completion-progress"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isNamedShape } from "../completion-named-shape/completion-named-shape.module.code.ts"
import type { AccountLoreProgress } from "../completion-ui-types/completion-ui-types.module.code.ts"

export function transformAccountLoreUnion(
  rows: readonly CompletionCharacterRow[]
): AccountLoreProgress {
  const knownSet = new Set<string>()

  for (const row of rows) {
    const loreLibrary = row.completion?.loreLibrary
    if (!loreLibrary) continue

    for (const [catIdx, category] of Object.entries(loreLibrary)) {
      if (isNamedShape<LoreCategory>(category)) {
        for (const [colIdx, collection] of Object.entries(category.collections)) {
          if (collection.books) {
            for (const [bookIdx, book] of Object.entries(collection.books)) {
              if (book.known) knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
            }
          }
        }
      } else {
        for (const [colIdx, bookIndices] of Object.entries(category)) {
          if (Array.isArray(bookIndices)) {
            for (const bookIdx of bookIndices) {
              knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
            }
          } else if (typeof bookIndices === "object" && bookIndices !== null) {
            for (const bookIdx of Object.values(bookIndices)) {
              knownSet.add(`${catIdx}:${colIdx}:${bookIdx}`)
            }
          }
        }
      }
    }
  }

  let totalKnown = 0
  let totalBooks = 0

  const categories = LORE_LIBRARY_DATA.map((cat) => {
    let catKnown = 0
    let catTotal = 0

    const collections = cat.collections.map((col) => {
      const books = col.books.map((book) => ({
        bookIndex: book.bookIndex,
        name: book.name,
        known: knownSet.has(`${cat.categoryIndex}:${col.collectionIndex}:${book.bookIndex}`),
      }))
      const knownCount = books.filter((b) => b.known).length
      catKnown += knownCount
      catTotal += books.length
      return {
        collectionIndex: col.collectionIndex,
        name: col.name,
        knownCount,
        totalBooks: books.length,
        books,
      }
    })

    totalKnown += catKnown
    totalBooks += catTotal
    return {
      categoryIndex: cat.categoryIndex,
      name: cat.name,
      collections,
      knownCount: catKnown,
      totalBooks: catTotal,
    }
  })

  return { categories, knownCount: totalKnown, totalBooks }
}
