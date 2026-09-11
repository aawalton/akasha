import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const theClocks = {
  id: "019db533-f399-7d00-8065-005db4c0c792",
  type: "book",
  slug: "the-clocks",
  title: "The Clocks",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 29,
} as const satisfies Book
