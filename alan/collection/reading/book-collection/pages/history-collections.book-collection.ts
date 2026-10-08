import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const historyCollections = {
  id: "01a06808-148e-702a-9e72-e4221d101cde",
  type: "page-type/book-collection",
  slug: "history-collections",
  title: "History Collections",
  partOfCollections: ["book-collection/book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
