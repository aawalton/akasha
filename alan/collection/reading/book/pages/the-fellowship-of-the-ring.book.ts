import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFellowshipOfTheRing = {
  id: "019db533-f38a-7e22-92aa-fc4d8e6cd85b",
  type: "page-type/book",
  slug: "the-fellowship-of-the-ring",
  title: "The Fellowship of the Ring",
  status: "completed",
  grade: "A",
  author: "J.R.R. Tolkien",
  unit: "unit/words",
  position: 1,
  publishedAt: "1954-07-29",
} as const satisfies Book
