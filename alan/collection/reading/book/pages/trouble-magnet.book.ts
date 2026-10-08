import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const troubleMagnet = {
  id: "019db533-f399-7aaa-b30d-556c3298f00a",
  type: "page-type/book",
  slug: "trouble-magnet",
  title: "Trouble Magnet",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 12,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
