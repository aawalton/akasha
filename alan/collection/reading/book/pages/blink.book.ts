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
} as const satisfies Book
