import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfJohnTaylor = {
  id: "019db533-f39d-7af5-87f0-d6fc3133cf07",
  type: "page-type/book",
  slug: "teachings-of-john-taylor",
  title: "Teachings of John Taylor",
  status: "not-started",
  author: "Samuel Taylor Coleridge",
  unit: "unit/words",
  position: 4,
  ownLength: 95250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
