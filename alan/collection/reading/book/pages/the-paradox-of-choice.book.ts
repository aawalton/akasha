import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theParadoxOfChoice = {
  id: "019db533-f39d-7e57-b1bb-de47af5fabdd",
  type: "page-type/book",
  slug: "the-paradox-of-choice",
  title: "The Paradox of Choice",
  status: "not-started",
  author: "Barry Schwartz, Ken Kliban",
  unit: "unit/words",
  ownLength: 105450,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
