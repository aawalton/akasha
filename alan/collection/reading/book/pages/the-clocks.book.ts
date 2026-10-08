import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theClocks = {
  id: "019db533-f399-7d00-8065-005db4c0c792",
  type: "page-type/book",
  slug: "the-clocks",
  title: "The Clocks",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 29,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
