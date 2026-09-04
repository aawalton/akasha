import type { Book } from "../../book.page-type.ts"

export const actionableGamification = {
  id: "019db533-f39d-7ccf-bf3c-dfd2575e5d08",
  pageTypeSlug: "book",
  slug: "actionable-gamification",
  title: "Actionable Gamification",
  status: "completed",
  rank: "A",
  author: "Yu-kai Chou",
  unitSlug: "words",
  position: 1,
  ownLength: 123750,
  ownProgress: 123750,
} as const satisfies Book
