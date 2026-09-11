import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const evershore = {
  id: "019db533-f39c-7f8a-9bb5-62a9f0c05a6a",
  type: "book",
  slug: "evershore",
  title: "Evershore",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "words",
  position: 3,
  ownLength: 103500,
  ownProgress: 103500,
} as const satisfies Book
