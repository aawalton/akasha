import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const factfulness = {
  id: "019db533-f39e-7187-881e-c6d708b92b6a",
  type: "page-type/book",
  slug: "factfulness",
  title: "Factfulness",
  status: "not-started",
  author: "Hans Rosling, Ola Rosling, Anna Rosling Rönnlund",
  unit: "unit/words",
  ownLength: 132750,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
