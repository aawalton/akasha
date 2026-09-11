import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const takenAtTheFlood = {
  id: "019db533-f399-7cc0-8f01-c135e73c68cb",
  type: "book",
  slug: "taken-at-the-flood",
  title: "Taken at the Flood",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 23,
} as const satisfies Book
