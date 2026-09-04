import type { Book } from "../../book.page-type.ts"

export const theHappinessHypothesis = {
  id: "019db533-f39d-7f45-907b-a591cda182e3",
  pageTypeSlug: "book",
  slug: "the-happiness-hypothesis",
  title: "The Happiness Hypothesis",
  status: "not-started",
  author: "Jonathan Haidt",
  unitSlug: "words",
  ownLength: 154500,
} as const satisfies Book
