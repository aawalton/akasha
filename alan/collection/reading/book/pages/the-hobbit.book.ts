import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHobbit = {
  id: "019db533-f38a-7e89-a09e-98dea9b2e539",
  type: "page-type/book",
  slug: "the-hobbit",
  title: "The Hobbit",
  status: "completed",
  grade: "A",
  author: "J.R.R. Tolkien",
  unit: "unit/words",
  position: 1,
  publishedAt: "1937-09-21",
} as const satisfies Book
