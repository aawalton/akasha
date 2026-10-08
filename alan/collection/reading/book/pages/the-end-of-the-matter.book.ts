import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theEndOfTheMatter = {
  id: "019db533-f399-7af5-b596-62f1bc473125",
  type: "page-type/book",
  slug: "the-end-of-the-matter",
  title: "The End of the Matter",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 4,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
