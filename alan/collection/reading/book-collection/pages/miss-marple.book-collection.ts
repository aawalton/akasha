import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const missMarple = {
  id: "01a06808-148f-7004-8028-26c494edea6a",
  type: "page-type/book-collection",
  slug: "miss-marple",
  title: "Miss Marple",
  partOfCollections: ["author/agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
