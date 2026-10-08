import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theUpwardSpiral = {
  id: "019db533-f39d-7ead-8fe2-7710be503f25",
  type: "page-type/book",
  slug: "the-upward-spiral",
  title: "The Upward Spiral",
  status: "not-started",
  author: "Alex Korb PhD, Daniel J. Siegel MD",
  unit: "unit/words",
  ownLength: 83550,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
