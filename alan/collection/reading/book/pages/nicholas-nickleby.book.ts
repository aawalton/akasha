import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nicholasNickleby = {
  id: "019db533-f39d-7ad7-9826-052280645a61",
  type: "page-type/book",
  slug: "nicholas-nickleby",
  title: "Nicholas Nickleby",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 1,
  ownLength: 208500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
