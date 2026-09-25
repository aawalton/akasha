import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const love20 = {
  id: "019db533-f39e-7051-85cb-cea86332dda0",
  type: "page-type/book",
  slug: "love-2-0",
  title: "Love 2.0",
  status: "not-started",
  author: "Barbara Fredrickson",
  unit: "unit/words",
  ownLength: 116700,
} as const satisfies Book
