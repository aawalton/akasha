import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aPocketFullOfRye = {
  id: "019db533-f399-7b95-b8df-a25f20e1975e",
  type: "page-type/book",
  slug: "a-pocket-full-of-rye",
  title: "A Pocket Full of Rye",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 7,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
