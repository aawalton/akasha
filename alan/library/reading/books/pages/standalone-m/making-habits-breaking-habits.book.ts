import type { Book } from "../../book.page-type.ts"

export const makingHabitsBreakingHabits = {
  id: "019db533-f39e-70ad-966e-58f563c33479",
  pageTypeSlug: "book",
  slug: "making-habits-breaking-habits",
  title: "Making Habits, Breaking Habits",
  status: "not-started",
  author: "Jeremy Dean",
  unitSlug: "words",
  ownLength: 97800,
} as const satisfies Book
