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
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
