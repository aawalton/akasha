import type { Book } from "../../book.page-type.ts"

export const theParadoxOfChoice = {
  id: "019db533-f39d-7e57-b1bb-de47af5fabdd",
  pageTypeSlug: "book",
  slug: "the-paradox-of-choice",
  title: "The Paradox of Choice",
  status: "not-started",
  author: "Barry Schwartz, Ken Kliban",
  unitSlug: "words",
  ownLength: 105450,
} as const satisfies Book
