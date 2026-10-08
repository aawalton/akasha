import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theScienceOfLove = {
  id: "019db533-f39d-7f06-add8-80e7ba704104",
  type: "page-type/book",
  slug: "the-science-of-love",
  title: "The Science of Love",
  status: "not-started",
  author: "John Baines",
  unit: "unit/words",
  ownLength: 76050,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
