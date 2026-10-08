import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journeyToZion = {
  id: "019db533-f39d-79ab-80de-51a939747d5f",
  type: "page-type/book",
  slug: "journey-to-zion",
  title: "Journey to Zion",
  status: "not-started",
  author: "Carol Cornwall Madsen",
  unit: "unit/words",
  position: 1,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
