import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theSilmarillion = {
  id: "01a06808-148f-7031-9c8e-d2682eebe32b",
  type: "page-type/book-collection",
  slug: "the-silmarillion",
  title: "The Silmarillion",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1977-09-15",
} as const satisfies BookCollection
