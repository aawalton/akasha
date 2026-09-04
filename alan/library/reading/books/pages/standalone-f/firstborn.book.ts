import type { Book } from "../../book.page-type.ts"

export const firstborn = {
  id: "019db533-f39d-723d-b9fb-d70f21720159",
  pageTypeSlug: "book",
  slug: "firstborn",
  title: "Firstborn",
  status: "completed",
  rank: "B",
  author: "Karen Kingsbury",
  unitSlug: "words",
  position: 1,
  ownLength: 19250,
  ownProgress: 19250,
} as const satisfies Book
