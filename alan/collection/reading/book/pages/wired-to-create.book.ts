import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wiredToCreate = {
  id: "019db533-f39d-7e07-993c-943fe19ef8ce",
  type: "page-type/book",
  slug: "wired-to-create",
  title: "Wired to Create",
  status: "not-started",
  author: "Scott Barry Kaufman",
  unit: "unit/words",
  ownLength: 99750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
