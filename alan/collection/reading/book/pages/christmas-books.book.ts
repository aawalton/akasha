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
} as const satisfies Book
