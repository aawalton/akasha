import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const orphanStar = {
  id: "019db533-f399-7b0a-8893-7a1e6735d4b2",
  type: "page-type/book",
  slug: "orphan-star",
  title: "Orphan Star",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 3,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
