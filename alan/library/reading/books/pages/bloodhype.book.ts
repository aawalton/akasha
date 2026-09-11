import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const bloodhype = {
  id: "019db533-f399-7a95-ba54-2e07c8a1e1ff",
  type: "book",
  slug: "bloodhype",
  title: "Bloodhype",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "words",
  position: 5,
} as const satisfies Book
