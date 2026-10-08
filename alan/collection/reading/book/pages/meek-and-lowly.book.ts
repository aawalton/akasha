import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const meekAndLowly = {
  id: "019db533-f39d-708b-9cf7-65491d8e7053",
  type: "page-type/book",
  slug: "meek-and-lowly",
  title: "Meek and Lowly",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 2,
  ownLength: 30000,
  ownProgress: 30000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
