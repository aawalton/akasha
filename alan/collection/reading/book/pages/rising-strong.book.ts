import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const risingStrong = {
  id: "019db533-f39e-70a5-8188-e07e1feb4ced",
  type: "page-type/book",
  slug: "rising-strong",
  title: "Rising Strong",
  status: "not-started",
  author: "Brené Brown",
  unit: "unit/words",
  ownLength: 132750,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
