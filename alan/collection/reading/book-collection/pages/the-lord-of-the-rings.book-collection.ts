import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theLordOfTheRings = {
  id: "01a06808-148f-7028-b743-27aebd7e1b31",
  type: "page-type/book-collection",
  slug: "the-lord-of-the-rings",
  title: "The Lord of the Rings",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "A",
  publishedAt: "1954-07-29",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
