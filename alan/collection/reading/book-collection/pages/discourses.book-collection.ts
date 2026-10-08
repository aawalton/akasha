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
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
