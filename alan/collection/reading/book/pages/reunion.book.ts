import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const reunion = {
  id: "019db533-f399-7aea-ae40-9b41d16ed02e",
  type: "page-type/book",
  slug: "reunion",
  title: "Reunion",
  status: "not-started",
  author: "Fred Uhlman",
  unit: "unit/words",
  position: 8,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
