import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHappinessHypothesis = {
  id: "019db533-f39d-7f45-907b-a591cda182e3",
  type: "page-type/book",
  slug: "the-happiness-hypothesis",
  title: "The Happiness Hypothesis",
  status: "not-started",
  author: "Jonathan Haidt",
  unit: "unit/words",
  ownLength: 154500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
