const EXPECTED_COLLECTION_COUNT = 29
const EXPECTED_BOOK_COUNT = 297
const SHALIDOR_CATEGORY_INDEX = 1

interface LoreLibraryBook {
  bookIndex: number
  name: string
}

interface LoreLibraryCollection {
  collectionIndex: number
  name: string
  books: readonly LoreLibraryBook[]
}

interface LoreLibraryCategory {
  categoryIndex: number
  name: string
  collections: readonly LoreLibraryCollection[]
}

export function generateLoreShalidor(loreLibraryData: readonly LoreLibraryCategory[]): string {
  const category = loreLibraryData.find((c) => c.categoryIndex === SHALIDOR_CATEGORY_INDEX)
  if (category === undefined) {
    throw new Error(
      `Shalidor's Library catalog: category ${SHALIDOR_CATEGORY_INDEX} not found in loreLibraryData`
    )
  }

  const collections = category.collections
  const books = collections.flatMap((c) => c.books)

  if (collections.length !== EXPECTED_COLLECTION_COUNT) {
    throw new Error(
      `Shalidor's Library catalog: expected ${EXPECTED_COLLECTION_COUNT} collections, got ${collections.length}`
    )
  }
  if (books.length !== EXPECTED_BOOK_COUNT) {
    throw new Error(
      `Shalidor's Library catalog: expected ${EXPECTED_BOOK_COUNT} books, got ${books.length}`
    )
  }

  const sortedCollections = [...collections].sort((a, b) => a.collectionIndex - b.collectionIndex)

  const collectionLines = sortedCollections.map((c) => {
    const collectionBooks = [...c.books].sort((a, b) => a.bookIndex - b.bookIndex)
    const bookLines = collectionBooks.map(
      (b) => `      { bookIndex: ${b.bookIndex}, name: ${JSON.stringify(b.name)} },`
    )
    return `\
  {
    collectionIndex: ${c.collectionIndex},
    name: ${JSON.stringify(c.name)},
    books: [
${bookLines.join("\n")}
    ],
  },`
  })

  return `\
/**
 * Shalidor's Library (lore category 1) catalog (Generated) — DO NOT EDIT — regenerate with: ops temper addon-data generate
 *
 * Sourced from category 1 of loreLibraryData (@temper/game-completion).
 */

export interface LoreShalidorBook {
  bookIndex: number
  name: string
}

export interface LoreShalidorCollection {
  collectionIndex: number
  name: string
  books: readonly LoreShalidorBook[]
}

export const shalidorLibraryCollections: readonly LoreShalidorCollection[] = [
${collectionLines.join("\n")}
]
`
}
