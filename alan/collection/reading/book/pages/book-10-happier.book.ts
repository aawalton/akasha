import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const book10Happier = {
  id: "019db533-f39e-7264-83a9-ea35363db5c5",
  type: "page-type/book",
  slug: "book-10-happier",
  title: "10% Happier",
  status: "not-started",
  author: "Dan Harris",
  unit: "unit/words",
  ownLength: 117450,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
