import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const factfulness = {
  id: "019db533-f39e-7187-881e-c6d708b92b6a",
  type: "book",
  slug: "factfulness",
  title: "Factfulness",
  status: "not-started",
  author: "Hans Rosling, Ola Rosling, Anna Rosling Rönnlund",
  unit: "words",
  ownLength: 132750,
} as const satisfies Book
