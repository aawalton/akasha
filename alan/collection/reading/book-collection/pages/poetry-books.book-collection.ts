import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const poetryBooks = {
  id: "01a06808-148f-700b-a0bb-1a25a13f7917",
  type: "page-type/book-collection",
  slug: "poetry-books",
  title: "Poetry Books",
  partOfCollections: ["book-collection/classics-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
