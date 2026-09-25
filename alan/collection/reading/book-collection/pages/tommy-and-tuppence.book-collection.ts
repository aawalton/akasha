import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const tommyAndTuppence = {
  id: "01a06808-148f-7038-a12f-534ac003f228",
  type: "page-type/book-collection",
  slug: "tommy-and-tuppence",
  title: "Tommy and Tuppence",
  partOfCollections: ["author/agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
