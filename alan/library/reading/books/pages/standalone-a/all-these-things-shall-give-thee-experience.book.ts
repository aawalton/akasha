import type { Book } from "../../book.page-type.ts"

export const allTheseThingsShallGiveTheeExperience = {
  id: "019db533-f39d-7292-a645-dd88e3345805",
  pageTypeSlug: "book",
  slug: "all-these-things-shall-give-thee-experience",
  title: "All These Things Shall Give Thee Experience",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 4,
  ownLength: 32000,
  ownProgress: 32000,
} as const satisfies Book
