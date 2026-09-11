import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const teachingsOfJohnTaylor = {
  id: "019db533-f39d-7af5-87f0-d6fc3133cf07",
  type: "book",
  slug: "teachings-of-john-taylor",
  title: "Teachings of John Taylor",
  status: "not-started",
  author: "Samuel Taylor Coleridge",
  unit: "words",
  position: 4,
  ownLength: 95250,
} as const satisfies Book
