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
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
