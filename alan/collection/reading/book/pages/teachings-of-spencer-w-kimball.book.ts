import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfSpencerWKimball = {
  id: "019db533-f39d-78f6-b47f-c5c6fce46bb9",
  type: "page-type/book",
  slug: "teachings-of-spencer-w-kimball",
  title: "Teachings of Spencer W. Kimball",
  status: "not-started",
  author: "Spencer W. Kimball",
  unit: "unit/words",
  position: 13,
  ownLength: 155000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
