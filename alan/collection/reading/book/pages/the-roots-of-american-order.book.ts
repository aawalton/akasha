import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRootsOfAmericanOrder = {
  id: "019db533-f39d-75c0-9ff6-b056ccf14261",
  type: "page-type/book",
  slug: "the-roots-of-american-order",
  title: "The Roots of American Order",
  status: "not-started",
  author: "Russell Kirk",
  unit: "unit/words",
  position: 8,
  ownLength: 119000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
