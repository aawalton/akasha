import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const littleDorrit = {
  id: "019db533-f39d-7abf-af52-0b511f269ed4",
  type: "page-type/book",
  slug: "little-dorrit",
  title: "Little Dorrit",
  status: "not-started",
  author: "Charles Dickens, Mary Sebag-Montefiore, Adam Leverton",
  unit: "unit/words",
  position: 8,
  ownLength: 213000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
