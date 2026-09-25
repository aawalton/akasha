import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const authenticHappiness = {
  id: "019db533-f39e-7205-989d-b882db4392d4",
  type: "page-type/book",
  slug: "authentic-happiness",
  title: "Authentic Happiness",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unit: "unit/words",
  ownLength: 66300,
} as const satisfies Book
