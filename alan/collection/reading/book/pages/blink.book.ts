import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const blink = {
  id: "019db533-f39e-7152-a1a6-e24ba6646347",
  type: "page-type/book",
  slug: "blink",
  title: "Blink",
  status: "not-started",
  author: "Malcolm Gladwell",
  unit: "unit/words",
  ownLength: 115950,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
