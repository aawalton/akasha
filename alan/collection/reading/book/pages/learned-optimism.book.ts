import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const learnedOptimism = {
  id: "019db533-f39d-7fb6-9763-19cb443d0b1e",
  type: "page-type/book",
  slug: "learned-optimism",
  title: "Learned Optimism",
  status: "completed",
  grade: "B",
  author: "Martin Elias Pete Seligman",
  unit: "unit/words",
  ownLength: 21000,
  ownProgress: 21000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
