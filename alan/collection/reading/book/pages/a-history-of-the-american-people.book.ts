import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aHistoryOfTheAmericanPeople = {
  id: "019db533-f39d-7dd1-a1c0-714e90bbac3b",
  type: "page-type/book",
  slug: "a-history-of-the-american-people",
  title: "A History of the American People",
  status: "not-started",
  author: "Paul S. Boyer",
  unit: "unit/words",
  position: 13,
  ownLength: 244000,
} as const satisfies Book
