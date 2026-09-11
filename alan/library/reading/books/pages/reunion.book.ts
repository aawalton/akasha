import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const reunion = {
  id: "019db533-f399-7aea-ae40-9b41d16ed02e",
  type: "book",
  slug: "reunion",
  title: "Reunion",
  status: "not-started",
  author: "Fred Uhlman",
  unit: "words",
  position: 8,
} as const satisfies Book
