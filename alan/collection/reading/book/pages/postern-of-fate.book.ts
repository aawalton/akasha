import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const posternOfFate = {
  id: "019db533-f399-7c75-84f8-de76ff96edcd",
  type: "page-type/book",
  slug: "postern-of-fate",
  title: "Postern of Fate",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 5,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
