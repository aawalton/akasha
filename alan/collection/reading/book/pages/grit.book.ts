import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const grit = {
  id: "019db533-f39e-71c5-bcac-b94486a52980",
  type: "page-type/book",
  slug: "grit",
  title: "Grit",
  status: "not-started",
  author: "Angela Duckworth",
  unit: "unit/words",
  ownLength: 140550,
} as const satisfies Book
