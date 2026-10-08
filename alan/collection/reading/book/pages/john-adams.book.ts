import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const johnAdams = {
  id: "019db533-f39d-79a3-bdf0-73b549eb462c",
  type: "page-type/book",
  slug: "john-adams",
  title: "John Adams",
  status: "completed",
  grade: "B",
  author: "David McCullough",
  unit: "unit/words",
  position: 2,
  ownLength: 162250,
  ownProgress: 162250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
