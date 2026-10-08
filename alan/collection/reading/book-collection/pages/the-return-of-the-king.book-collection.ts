import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theReturnOfTheKing = {
  id: "01a06808-148f-702d-b46e-1f8d94e67a85",
  type: "page-type/book-collection",
  slug: "the-return-of-the-king",
  title: "The Return of the King",
  partOfCollections: ["book-collection/the-lord-of-the-rings"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "A",
  publishedAt: "1955-10-20",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
