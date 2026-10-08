import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const attached = {
  id: "019db533-f39e-713a-a066-e325d765444d",
  type: "page-type/book",
  slug: "attached",
  title: "Attached",
  status: "not-started",
  author: "Amir Levine",
  unit: "unit/words",
  ownLength: 107550,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
