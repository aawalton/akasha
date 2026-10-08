import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const bookCollections = {
  id: "01a06808-148e-7008-b1f1-e772954a9d02",
  type: "page-type/book-collection",
  slug: "book-collections",
  title: "Book Collections",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
