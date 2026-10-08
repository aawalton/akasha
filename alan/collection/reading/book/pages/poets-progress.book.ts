import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const poetsProgress = {
  id: "019db533-f39d-7ae5-81b9-c43c6e36fd5d",
  type: "page-type/book",
  slug: "poets-progress",
  title: "Poet's Progress",
  status: "not-started",
  author: "Ben Linsey-Bloom, Pamella Linsey",
  unit: "unit/words",
  position: 13,
  ownLength: 55750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
