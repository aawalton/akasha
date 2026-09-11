import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const orphanStar = {
  id: "019db533-f399-7b0a-8893-7a1e6735d4b2",
  type: "book",
  slug: "orphan-star",
  title: "Orphan Star",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "words",
  position: 3,
} as const satisfies Book
