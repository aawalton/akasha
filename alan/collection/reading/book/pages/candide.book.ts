import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const candide = {
  id: "019db533-f39d-7bbd-87c1-a946aad1a20b",
  type: "page-type/book",
  slug: "candide",
  title: "Candide",
  status: "not-started",
  author: "Voltaire",
  unit: "unit/words",
  position: 3,
  ownLength: 32750,
} as const satisfies Book
