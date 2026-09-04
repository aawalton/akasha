import type { Book } from "../../book.page-type.ts"

export const aHistoryOfTheAmericanPeople = {
  id: "019db533-f39d-7dd1-a1c0-714e90bbac3b",
  pageTypeSlug: "book",
  slug: "a-history-of-the-american-people",
  title: "A History of the American People",
  status: "not-started",
  author: "Paul S. Boyer",
  unitSlug: "words",
  position: 13,
  ownLength: 244000,
} as const satisfies Book
