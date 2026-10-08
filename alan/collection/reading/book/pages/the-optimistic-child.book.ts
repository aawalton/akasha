import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theOptimisticChild = {
  id: "019db533-f39d-7efe-8799-b69295a28936",
  type: "page-type/book",
  slug: "the-optimistic-child",
  title: "The Optimistic Child",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unit: "unit/words",
  ownLength: 193500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
