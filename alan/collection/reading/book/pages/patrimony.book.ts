import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const patrimony = {
  id: "019db533-f399-7aca-b2df-0c4a8453f0b6",
  type: "page-type/book",
  slug: "patrimony",
  title: "Patrimony",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 13,
} as const satisfies Book
