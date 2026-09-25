import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBigFour = {
  id: "019db533-f399-7c00-95a7-17693d4da3ea",
  type: "page-type/book",
  slug: "the-big-four",
  title: "The Big Four",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 5,
  ownLength: 70500,
} as const satisfies Book
