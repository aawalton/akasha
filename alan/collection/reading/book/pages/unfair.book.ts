import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const unfair = {
  id: "019db533-f39d-7eb7-bb2a-24f25e2fa5b3",
  type: "page-type/book",
  slug: "unfair",
  title: "Unfair",
  status: "not-started",
  author: "Adam Benforado",
  unit: "unit/words",
  ownLength: 150750,
} as const satisfies Book
