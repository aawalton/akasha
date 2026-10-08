import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFirst20Hours = {
  id: "019db533-f39d-7ebf-90da-a3fd54503f0d",
  type: "page-type/book",
  slug: "the-first-20-hours",
  title: "The First 20 Hours",
  status: "not-started",
  author: "Josh Kaufman",
  unit: "unit/words",
  ownLength: 109200,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
