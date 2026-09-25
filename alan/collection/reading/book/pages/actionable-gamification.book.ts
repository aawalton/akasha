import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const actionableGamification = {
  id: "019db533-f39d-7ccf-bf3c-dfd2575e5d08",
  type: "page-type/book",
  slug: "actionable-gamification",
  title: "Actionable Gamification",
  status: "completed",
  grade: "A",
  author: "Yu-kai Chou",
  unit: "unit/words",
  position: 1,
  ownLength: 123750,
  ownProgress: 123750,
} as const satisfies Book
