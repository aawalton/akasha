import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBookOfLostTalesPartOne = {
  id: "019db533-f38a-7dde-83d2-551b65914cd3",
  type: "page-type/book",
  slug: "the-book-of-lost-tales-part-one",
  title: "The Book of Lost Tales, Part One",
  status: "not-started",
  author: "J.R.R. Tolkien",
  unit: "unit/words",
  position: 1,
  publishedAt: "1983-01-01",
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
