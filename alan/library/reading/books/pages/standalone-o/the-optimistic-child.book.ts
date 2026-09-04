import type { Book } from "../../book.page-type.ts"

export const theOptimisticChild = {
  id: "019db533-f39d-7efe-8799-b69295a28936",
  pageTypeSlug: "book",
  slug: "the-optimistic-child",
  title: "The Optimistic Child",
  status: "not-started",
  author: "Martin Elias Pete Seligman",
  unitSlug: "words",
  ownLength: 193500,
} as const satisfies Book
