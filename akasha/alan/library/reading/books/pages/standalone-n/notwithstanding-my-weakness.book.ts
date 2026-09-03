import type { Book } from "../../book.page-type.ts"

export const notwithstandingMyWeakness = {
  id: "019db533-f39d-70f3-8a02-cf7d068e0ac4",
  pageTypeSlug: "book",
  slug: "notwithstanding-my-weakness",
  title: "Notwithstanding My Weakness",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 5,
  ownLength: 31000,
  ownProgress: 31000,
} as const satisfies Book
