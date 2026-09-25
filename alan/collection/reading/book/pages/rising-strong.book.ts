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
} as const satisfies Book
