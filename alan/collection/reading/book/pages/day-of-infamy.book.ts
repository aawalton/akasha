import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dayOfInfamy = {
  id: "019db533-f39d-7b48-8360-9667f0ba4240",
  type: "page-type/book",
  slug: "day-of-infamy",
  title: "Day of Infamy",
  status: "not-started",
  author: "Walter Lord",
  unit: "unit/words",
  position: 11,
  ownLength: 53000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
