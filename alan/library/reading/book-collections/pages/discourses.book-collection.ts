import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const discourses = {
  id: "01a06808-148e-7018-8575-3ec3ff497e4e",
  type: "book-collection",
  slug: "discourses",
  title: "Discourses",
  partOfCollections: ["faith-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
