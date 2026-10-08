import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const deathOnTheNile = {
  id: "019db533-f399-7d0a-94ad-a0cfdf7243c3",
  type: "page-type/book",
  slug: "death-on-the-nile",
  title: "Death on the Nile",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 15,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
