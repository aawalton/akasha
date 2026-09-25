import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const histories = {
  id: "01a06808-148e-7027-90c5-c816c6339522",
  type: "page-type/book-collection",
  slug: "histories",
  title: "Histories",
  partOfCollections: ["book-collection/the-joseph-smith-papers"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
