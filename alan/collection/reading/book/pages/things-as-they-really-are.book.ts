import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thingsAsTheyReallyAre = {
  id: "019db533-f39c-7fb2-ba3f-54bda46c231a",
  type: "page-type/book",
  slug: "things-as-they-really-are",
  title: "Things As They Really Are",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 3,
  ownLength: 30250,
  ownProgress: 30250,
} as const satisfies Book
