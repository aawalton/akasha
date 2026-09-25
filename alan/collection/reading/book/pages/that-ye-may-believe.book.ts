import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thatYeMayBelieve = {
  id: "019db533-f39d-726c-808b-b49039cd1d3c",
  type: "page-type/book",
  slug: "that-ye-may-believe",
  title: "That Ye May Believe",
  status: "completed",
  grade: "C",
  author: "David Keppel",
  unit: "unit/words",
  position: 1,
  ownLength: 28000,
  ownProgress: 28000,
} as const satisfies Book
