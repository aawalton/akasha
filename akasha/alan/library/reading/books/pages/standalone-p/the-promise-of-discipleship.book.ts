import type { Book } from "../../book.page-type.ts"

export const thePromiseOfDiscipleship = {
  id: "019db533-f39d-70a3-bf90-5a956a4fe5ff",
  pageTypeSlug: "book",
  slug: "the-promise-of-discipleship",
  title: "The Promise of Discipleship",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 1,
  ownLength: 32250,
  ownProgress: 32250,
} as const satisfies Book
