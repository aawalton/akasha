import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const histories2 = {
  id: "01a06808-148e-7028-b25d-657088720b00",
  type: "page-type/book-collection",
  slug: "histories-2",
  title: "Histories",
  partOfCollections: ["book-collection/history-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
