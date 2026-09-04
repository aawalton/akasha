import type { Book } from "../../book.page-type.ts"

export const greatExpectationsAndHardTimes = {
  id: "019db533-f39d-7a5a-a31c-200222db21eb",
  pageTypeSlug: "book",
  slug: "great-expectations-and-hard-times",
  title: "Great Expectations & Hard Times",
  kind: "read",
  status: "not-started",
  author: "Charles Dickens",
  unitSlug: "words",
  position: 5,
  ownLength: 191250,
} as const satisfies Book
