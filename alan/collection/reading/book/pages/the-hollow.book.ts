import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHollow = {
  id: "019db533-f399-7cf5-bccf-2a3f0e8b52e4",
  type: "page-type/book",
  slug: "the-hollow",
  title: "The Hollow",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 22,
} as const satisfies Book
