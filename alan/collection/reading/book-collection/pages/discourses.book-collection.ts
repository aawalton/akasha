import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const discourses = {
  id: "01a06808-148e-7018-8575-3ec3ff497e4e",
  type: "page-type/book-collection",
  slug: "discourses",
  title: "Discourses",
  partOfCollections: ["book-collection/faith-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
