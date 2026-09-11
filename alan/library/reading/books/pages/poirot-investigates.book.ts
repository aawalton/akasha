import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const poirotInvestigates = {
  id: "019db533-f399-7d6b-a975-7efb3c489b8f",
  type: "book",
  slug: "poirot-investigates",
  title: "Poirot Investigates",
  status: "not-started",
  author: "Agatha Christie",
  unit: "words",
  position: 3,
  ownLength: 77500,
} as const satisfies Book
