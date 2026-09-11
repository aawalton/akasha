import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const posternOfFate = {
  id: "019db533-f399-7c75-84f8-de76ff96edcd",
  type: "book",
  slug: "postern-of-fate",
  title: "Postern of Fate",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 5,
} as const satisfies Book
