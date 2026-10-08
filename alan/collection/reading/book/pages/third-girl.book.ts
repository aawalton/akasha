import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thirdGirl = {
  id: "019db533-f399-7c60-af0d-b54a804a952e",
  type: "page-type/book",
  slug: "third-girl",
  title: "Third Girl",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 30,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
