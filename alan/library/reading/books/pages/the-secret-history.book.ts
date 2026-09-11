import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const theSecretHistory = {
  id: "019db533-f39d-7031-b232-33090c8dca49",
  type: "book",
  slug: "the-secret-history",
  title: "The Secret History",
  status: "not-started",
  author: "Donna Tartt",
  unit: "words",
  position: 4,
  ownLength: 42500,
} as const satisfies Book
