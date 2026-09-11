import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const deadMansFolly = {
  id: "019db533-f399-7bf5-8257-24ba995a157d",
  type: "book",
  slug: "dead-mans-folly",
  title: "Dead Man's Folly",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 27,
} as const satisfies Book
