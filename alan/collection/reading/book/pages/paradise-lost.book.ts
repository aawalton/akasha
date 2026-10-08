import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const paradiseLost = {
  id: "019db533-f39d-7a51-9743-9576b68e1c8c",
  type: "page-type/book",
  slug: "paradise-lost",
  title: "Paradise Lost",
  status: "not-started",
  author: "John Milton",
  unit: "unit/words",
  position: 10,
  ownLength: 84500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
