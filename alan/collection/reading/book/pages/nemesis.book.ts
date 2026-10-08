import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const nemesis = {
  id: "019db533-f399-7b8a-a6f4-f193708a01de",
  type: "page-type/book",
  slug: "nemesis",
  title: "Nemesis",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 12,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
