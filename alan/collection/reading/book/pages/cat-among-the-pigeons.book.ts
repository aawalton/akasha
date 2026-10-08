import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const catAmongThePigeons = {
  id: "019db533-f399-7d15-8cc2-5a7aca8f8d78",
  type: "page-type/book",
  slug: "cat-among-the-pigeons",
  title: "Cat Among the Pigeons",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 28,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
