import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const deathOnTheNile = {
  id: "019db533-f399-7d0a-94ad-a0cfdf7243c3",
  type: "book",
  slug: "death-on-the-nile",
  title: "Death on the Nile",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 15,
} as const satisfies Book
