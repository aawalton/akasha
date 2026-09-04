import type { Book } from "../../book.page-type.ts"

export const menWomenAndWorthiness = {
  id: "019db533-f39e-70cc-b976-068f53d13e6e",
  pageTypeSlug: "book",
  slug: "men-women-and-worthiness",
  title: "Men, Women, and Worthiness",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brené Brown",
  unitSlug: "words",
  ownLength: 33450,
  ownProgress: 33450,
} as const satisfies Book
