import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const spencerWKimball = {
  id: "019db533-f39d-7a04-b04b-ef81ed78fee2",
  type: "page-type/book",
  slug: "spencer-w-kimball",
  title: "Spencer W. Kimball",
  status: "not-started",
  author: "Spencer W. Kimball",
  unit: "unit/words",
  position: 7,
  ownLength: 106750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
