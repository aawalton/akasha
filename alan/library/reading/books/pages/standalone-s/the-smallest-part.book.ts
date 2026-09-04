import type { Book } from "../../book.page-type.ts"

export const theSmallestPart = {
  id: "019db533-f39c-7f7b-85b2-deacc933160c",
  pageTypeSlug: "book",
  slug: "the-smallest-part",
  title: "The Smallest Part",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Amy Harmon",
  unitSlug: "words",
  position: 1,
  ownLength: 19500,
  ownProgress: 19500,
} as const satisfies Book
