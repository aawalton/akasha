import type { Book } from "../../book.page-type.ts"

export const essentialReality = {
  id: "019db533-f39e-71bd-9710-3a75d7814fc6",
  pageTypeSlug: "book",
  slug: "essential-reality",
  title: "Essential Reality",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Jason Fried, David Heinemeier Hansson",
  unitSlug: "words",
  ownLength: 14250,
  ownProgress: 14250,
} as const satisfies Book
