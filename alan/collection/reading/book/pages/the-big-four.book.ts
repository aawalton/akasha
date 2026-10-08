import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBigFour = {
  id: "019db533-f399-7c00-95a7-17693d4da3ea",
  type: "page-type/book",
  slug: "the-big-four",
  title: "The Big Four",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 5,
  ownLength: 70500,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
