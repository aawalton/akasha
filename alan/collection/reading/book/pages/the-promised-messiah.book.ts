import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePromisedMessiah = {
  id: "019db533-f39d-7039-bb20-1ba4797291dd",
  type: "page-type/book",
  slug: "the-promised-messiah",
  title: "The Promised Messiah",
  status: "paused",
  author: "Bruce R. McConkie",
  unit: "unit/words",
  position: 1,
  ownLength: 153750,
  ownProgress: 8500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
