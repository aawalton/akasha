import type { Book } from "../../book.page-type.ts"

export const defendingElysium = {
  id: "019db533-f39d-71b8-a266-3eafe03b2539",
  pageTypeSlug: "book",
  slug: "defending-elysium",
  title: "Defending Elysium",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 20750,
  ownProgress: 20750,
} as const satisfies Book
