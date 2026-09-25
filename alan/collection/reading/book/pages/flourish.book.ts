import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const flourish = {
  id: "019db533-f39e-7142-8f1c-9e399db40a8d",
  type: "page-type/book",
  slug: "flourish",
  title: "Flourish",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unit: "unit/words",
  ownLength: 142500,
} as const satisfies Book
