import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const midFlinx = {
  id: "019db533-f399-7ab5-81f6-8da9f63eaa72",
  type: "page-type/book",
  slug: "mid-flinx",
  title: "Mid-Flinx",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 7,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
