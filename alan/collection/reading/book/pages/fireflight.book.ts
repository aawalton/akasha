import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const fireflight = {
  id: "019db533-f39d-71bf-aea9-51a4f5cde39b",
  type: "page-type/book",
  slug: "fireflight",
  title: "Fireflight",
  status: "not-started",
  author: "Gregory Grayson",
  unit: "unit/words",
  position: 2,
  ownLength: 105250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
