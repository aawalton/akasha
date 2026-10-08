import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const getUp = {
  id: "019db533-f39e-70fb-b83c-9b605f87073d",
  type: "page-type/book",
  slug: "get-up",
  title: "Get Up!",
  status: "not-started",
  author: "Dr. Seuss",
  unit: "unit/words",
  ownLength: 137700,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
