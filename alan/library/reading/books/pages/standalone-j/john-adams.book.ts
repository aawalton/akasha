import type { Book } from "../../book.page-type.ts"

export const johnAdams = {
  id: "019db533-f39d-79a3-bdf0-73b549eb462c",
  pageTypeSlug: "book",
  slug: "john-adams",
  title: "John Adams",
  status: "completed",
  rank: "B",
  author: "David McCullough",
  unitSlug: "words",
  position: 2,
  ownLength: 162250,
  ownProgress: 162250,
} as const satisfies Book
