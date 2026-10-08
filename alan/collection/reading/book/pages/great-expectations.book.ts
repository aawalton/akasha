import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const greatExpectations = {
  id: "019db533-f39d-7a91-9b74-2290c2685ea7",
  type: "page-type/book",
  slug: "great-expectations",
  title: "Great Expectations",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 6,
  ownLength: 131500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
