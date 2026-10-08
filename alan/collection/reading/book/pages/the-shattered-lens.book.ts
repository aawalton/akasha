import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theShatteredLens = {
  id: "019db533-f39d-70cb-9214-e1d81e7f8684",
  type: "page-type/book",
  slug: "the-shattered-lens",
  title: "The Shattered Lens",
  status: "completed",
  grade: "B",
  author: "Jonathan Alpeyrie",
  unit: "unit/words",
  position: 4,
  ownLength: 80250,
  ownProgress: 80250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
