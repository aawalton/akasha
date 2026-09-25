import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book450FromPaddington = {
  id: "019db533-f399-7ba0-914e-43248a721d22",
  type: "page-type/book",
  slug: "book-4-50-from-paddington",
  title: "4.50 from Paddington",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 8,
} as const satisfies Book
