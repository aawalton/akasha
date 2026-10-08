import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dawnshard = {
  id: "019db533-f39d-702a-99e3-96ba139416f2",
  type: "page-type/book",
  slug: "dawnshard",
  title: "Dawnshard",
  status: "not-started",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 5,
  ownLength: 69250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
