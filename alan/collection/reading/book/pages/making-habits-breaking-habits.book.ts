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
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
