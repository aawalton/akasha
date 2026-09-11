import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const snapshot = {
  id: "019db533-f39d-7254-85c8-766ab7d3ae04",
  type: "book",
  slug: "snapshot",
  title: "Snapshot",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unit: "words",
  position: 3,
  ownLength: 26750,
  ownProgress: 26750,
} as const satisfies Book
