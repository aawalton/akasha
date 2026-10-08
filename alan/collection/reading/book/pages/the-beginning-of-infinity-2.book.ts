import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBeginningOfInfinity2 = {
  id: "019db533-f39e-7196-8c32-fdac049597a6",
  type: "page-type/book",
  slug: "the-beginning-of-infinity-2",
  title: "The Beginning of Infinity",
  status: "completed",
  grade: "S",
  author: "David Deutsch",
  unit: "unit/words",
  ownLength: 300000,
  ownProgress: 300000,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
