import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bleakHouse = {
  id: "019db533-f39d-7bde-99c3-2dfa4b497c0e",
  type: "page-type/book",
  slug: "bleak-house",
  title: "Bleak House",
  status: "not-started",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 9,
  ownLength: 218500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
