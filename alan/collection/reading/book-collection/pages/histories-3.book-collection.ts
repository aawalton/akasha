import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const histories3 = {
  id: "01a06808-148e-7029-b9f0-b9c5b4d682b9",
  type: "page-type/book-collection",
  slug: "histories-3",
  title: "Histories",
  partOfCollections: ["book-collection/faith-collections"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
