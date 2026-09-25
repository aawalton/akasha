import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book1776 = {
  id: "019db533-f39d-7cf4-bee0-60cc221349c8",
  type: "page-type/book",
  slug: "book-1776",
  title: "1776",
  status: "not-started",
  author: "David McCullough",
  unit: "unit/words",
  position: 4,
  ownLength: 73500,
} as const satisfies Book
