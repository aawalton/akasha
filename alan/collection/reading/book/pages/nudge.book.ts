import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nudge = {
  id: "019db533-f39d-7f91-b919-f90bdcaafcc0",
  type: "page-type/book",
  slug: "nudge",
  title: "Nudge",
  status: "not-started",
  author: "Richard H. Thaler, Cass R. Sunstein",
  unit: "unit/words",
  ownLength: 171450,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
