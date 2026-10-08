import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book12RulesForLife = {
  id: "019db533-f39e-7172-a6a9-0b00d645a11e",
  type: "page-type/book",
  slug: "book-12-rules-for-life",
  title: "12 Rules for Life",
  status: "not-started",
  author: "Jordan B. Peterson",
  unit: "unit/words",
  ownLength: 235050,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
