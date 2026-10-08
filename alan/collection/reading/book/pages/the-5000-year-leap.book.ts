import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const the5000YearLeap = {
  id: "019db533-f39d-78ee-85aa-65b7c8c280b0",
  type: "page-type/book",
  slug: "the-5000-year-leap",
  title: "The 5000 Year Leap",
  status: "not-started",
  author: "W. Cleon Skousen",
  unit: "unit/words",
  position: 12,
  ownLength: 77500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
