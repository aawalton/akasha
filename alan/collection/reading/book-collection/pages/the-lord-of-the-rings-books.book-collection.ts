import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theLordOfTheRingsBooks = {
  id: "01a06808-148f-7029-86d6-640d5081b929",
  type: "page-type/book-collection",
  slug: "the-lord-of-the-rings-books",
  title: "The Lord of the Rings Books",
  partOfCollections: ["fandom/the-lord-of-the-rings-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "following",
  grade: "A",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
