import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSecretHistory = {
  id: "019db533-f39d-7031-b232-33090c8dca49",
  type: "page-type/book",
  slug: "the-secret-history",
  title: "The Secret History",
  status: "not-started",
  author: "Donna Tartt",
  unit: "unit/words",
  position: 4,
  ownLength: 42500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
