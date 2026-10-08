import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const platonic = {
  id: "019db533-f39e-70dc-a070-555275600b2c",
  type: "page-type/book",
  slug: "platonic",
  title: "Platonic",
  status: "not-started",
  author: "Walter Pater",
  unit: "unit/words",
  ownLength: 164250,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
