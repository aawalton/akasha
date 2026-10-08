import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const martinChuzzlewit = {
  id: "019db533-f39d-7a23-a769-e103deaa2a36",
  type: "page-type/book",
  slug: "martin-chuzzlewit",
  title: "Martin Chuzzlewit",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 6,
  ownLength: 211000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
