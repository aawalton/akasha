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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
