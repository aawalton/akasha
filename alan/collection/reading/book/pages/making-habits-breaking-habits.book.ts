import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const makingHabitsBreakingHabits = {
  id: "019db533-f39e-70ad-966e-58f563c33479",
  type: "page-type/book",
  slug: "making-habits-breaking-habits",
  title: "Making Habits, Breaking Habits",
  status: "not-started",
  author: "Jeremy Dean",
  unit: "unit/words",
  ownLength: 97800,
} as const satisfies Book
