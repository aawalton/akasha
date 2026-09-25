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
} as const satisfies BookCollection
