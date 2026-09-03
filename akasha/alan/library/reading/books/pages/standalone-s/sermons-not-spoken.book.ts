import type { Book } from "../../book.page-type.ts"

export const sermonsNotSpoken = {
  id: "019db533-f39d-7245-8964-260598dcc7a3",
  pageTypeSlug: "book",
  slug: "sermons-not-spoken",
  title: "Sermons Not Spoken",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 5,
  ownLength: 24750,
  ownProgress: 24750,
} as const satisfies Book
