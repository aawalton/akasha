import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const flinxsFolly = {
  id: "019db533-f399-7ad5-838b-dd719edc6dca",
  type: "page-type/book",
  slug: "flinxs-folly",
  title: "Flinx's Folly",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 9,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
