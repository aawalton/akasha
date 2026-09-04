import type { Book } from "../../book.page-type.ts"

export const throughTheYears = {
  id: "019db533-f39d-75a5-81d5-26bcdda9f784",
  pageTypeSlug: "book",
  slug: "through-the-years",
  title: "Through The Years",
  kind: "read",
  status: "paused",
  author: "Linda Howard, Fern Michaels, Debbie Macomber",
  unitSlug: "words",
  position: 1,
  ownLength: 22750,
  ownProgress: 750,
} as const satisfies Book
