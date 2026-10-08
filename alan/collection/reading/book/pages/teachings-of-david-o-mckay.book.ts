import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfDavidOMckay = {
  id: "019db533-f39d-7994-9a48-16de0b257432",
  type: "page-type/book",
  slug: "teachings-of-david-o-mckay",
  title: "Teachings of David O. McKay",
  status: "not-started",
  author: "David Oman McKay",
  unit: "unit/words",
  position: 10,
  ownLength: 146000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
