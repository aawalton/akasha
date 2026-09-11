import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const dragondrums = {
  id: "019db533-f399-7db5-bb55-c9cb68e33b85",
  type: "book",
  slug: "dragondrums",
  title: "Dragondrums",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "words",
  position: 19,
  ownLength: 60000,
} as const satisfies Book
