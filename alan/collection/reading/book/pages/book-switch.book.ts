import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bookSwitch = {
  id: "019db533-f39e-7049-ba48-6466527e923a",
  type: "page-type/book",
  slug: "book-switch",
  title: "Switch",
  status: "not-started",
  author: "Robert Lawrence Stine",
  unit: "unit/words",
  ownLength: 115800,
} as const satisfies Book
