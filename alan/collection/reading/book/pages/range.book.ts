import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const range = {
  id: "019db533-f39d-7f8a-9d07-9bdd6d3a47db",
  type: "page-type/book",
  slug: "range",
  title: "Range",
  status: "not-started",
  author: "David J. Epstein",
  unit: "unit/words",
  ownLength: 161550,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
