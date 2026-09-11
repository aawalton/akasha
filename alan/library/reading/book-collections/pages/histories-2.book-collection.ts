import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const histories2 = {
  id: "01a06808-148e-7028-b25d-657088720b00",
  type: "book-collection",
  slug: "histories-2",
  title: "Histories",
  partOfCollections: ["history-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
