import type { Book } from "../../book.page-type.ts"

export const childrenOfTheNameless = {
  id: "019db533-f39d-7600-bfd3-40590965f912",
  pageTypeSlug: "book",
  slug: "children-of-the-nameless",
  title: "Children of the Nameless",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 9,
  ownLength: 55000,
  ownProgress: 55000,
} as const satisfies Book
