import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfKingsPrime = {
  id: "019db533-f39c-7fc2-958b-c18fdd72b2a0",
  type: "page-type/book",
  slug: "the-way-of-kings-prime",
  title: "The Way of Kings Prime",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 7,
  ownLength: 200500,
  createdAt: "2026-04-22T12:39:34.044Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
