import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cardsOnTheTable = {
  id: "019db533-f399-7c95-bcd7-10dc608aed9b",
  type: "page-type/book",
  slug: "cards-on-the-table",
  title: "Cards on the Table",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 12,
} as const satisfies Book
