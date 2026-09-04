import type { Book } from "../../book.page-type.ts"

export const butForASmallMoment = {
  id: "019db533-f39d-73bc-b2ab-6637aef9bb2e",
  pageTypeSlug: "book",
  slug: "but-for-a-small-moment",
  title: "But For A Small Moment",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 1,
  ownLength: 33250,
  ownProgress: 33250,
} as const satisfies Book
