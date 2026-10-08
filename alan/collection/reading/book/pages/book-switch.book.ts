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
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
