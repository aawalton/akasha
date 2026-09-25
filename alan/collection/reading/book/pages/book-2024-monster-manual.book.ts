import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book2024MonsterManual = {
  id: "019db533-f39d-7cec-bbd1-926c964e52cb",
  type: "page-type/book",
  slug: "book-2024-monster-manual",
  title: "2024 Monster Manual",
  status: "not-started",
  author: "Robert Louis Stevenson",
  unit: "unit/words",
  position: 3,
} as const satisfies Book
