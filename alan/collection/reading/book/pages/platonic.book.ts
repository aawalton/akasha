import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const platonic = {
  id: "019db533-f39e-70dc-a070-555275600b2c",
  type: "page-type/book",
  slug: "platonic",
  title: "Platonic",
  status: "not-started",
  author: "Walter Pater",
  unit: "unit/words",
  ownLength: 164250,
} as const satisfies Book
