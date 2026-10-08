import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const christmasBooks = {
  id: "019db533-f39d-7be7-aa63-a8983ae978e0",
  type: "page-type/book",
  slug: "christmas-books",
  title: "Christmas Books",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 4,
  ownLength: 120500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
