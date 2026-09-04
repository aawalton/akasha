import type { Book } from "../../book.page-type.ts"

export const factfulness = {
  id: "019db533-f39e-7187-881e-c6d708b92b6a",
  pageTypeSlug: "book",
  slug: "factfulness",
  title: "Factfulness",
  status: "not-started",
  author: "Hans Rosling, Ola Rosling, Anna Rosling Rönnlund",
  unitSlug: "words",
  ownLength: 132750,
} as const satisfies Book
