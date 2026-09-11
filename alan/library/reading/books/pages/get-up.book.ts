import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const getUp = {
  id: "019db533-f39e-70fb-b83c-9b605f87073d",
  type: "book",
  slug: "get-up",
  title: "Get Up!",
  status: "not-started",
  author: "Dr. Seuss",
  unit: "words",
  ownLength: 137700,
} as const satisfies Book
