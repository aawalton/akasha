import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theHistoryOfMiddleEarth = {
  id: "01a06808-148f-7025-988b-c8b1e697b6e3",
  type: "page-type/book-collection",
  slug: "the-history-of-middle-earth",
  title: "The History of Middle-earth",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1983-01-01",
} as const satisfies BookCollection
