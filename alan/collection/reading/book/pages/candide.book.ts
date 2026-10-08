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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
