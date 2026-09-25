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
} as const satisfies Book
