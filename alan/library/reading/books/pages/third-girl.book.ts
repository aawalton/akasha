import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const thirdGirl = {
  id: "019db533-f399-7c60-af0d-b54a804a952e",
  type: "book",
  slug: "third-girl",
  title: "Third Girl",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 30,
} as const satisfies Book
