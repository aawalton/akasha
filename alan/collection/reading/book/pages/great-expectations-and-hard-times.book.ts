import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const greatExpectationsAndHardTimes = {
  id: "019db533-f39d-7a5a-a31c-200222db21eb",
  type: "page-type/book",
  slug: "great-expectations-and-hard-times",
  title: "Great Expectations & Hard Times",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 5,
  ownLength: 191250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
