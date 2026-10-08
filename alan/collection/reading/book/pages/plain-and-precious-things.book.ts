import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const plainAndPreciousThings = {
  id: "019db533-f39d-722e-a69b-c11c4a44eac5",
  type: "page-type/book",
  slug: "plain-and-precious-things",
  title: "Plain and Precious Things",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 3,
  ownLength: 25000,
  ownProgress: 25000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
