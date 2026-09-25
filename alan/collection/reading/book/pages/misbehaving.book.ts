import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const misbehaving = {
  id: "019db533-f39e-70d5-9393-c202a6e8533e",
  type: "page-type/book",
  slug: "misbehaving",
  title: "Misbehaving",
  status: "not-started",
  author: "Richard H. Thaler",
  unit: "unit/words",
  ownLength: 203700,
} as const satisfies Book
