import type { Book } from "../../book.page-type.ts"

export const perfectState = {
  id: "019db533-f39d-70ab-a06a-9fb76a7e8a14",
  pageTypeSlug: "book",
  slug: "perfect-state",
  title: "Perfect State",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 230000,
  ownProgress: 230000,
} as const satisfies Book
