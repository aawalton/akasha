import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wutheringHeights = {
  id: "019db533-f39d-75c7-a08f-28e2179f0faa",
  type: "page-type/book",
  slug: "wuthering-heights",
  title: "Wuthering Heights",
  status: "not-started",
  author: "Emily Brontë",
  unit: "unit/words",
  position: 5,
  ownLength: 100250,
} as const satisfies Book
