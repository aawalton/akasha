import type { Book } from "../../book.page-type.ts"

export const atomicHabits = {
  id: "019db533-f39e-712a-aa9b-0240baec3ed1",
  pageTypeSlug: "book",
  slug: "atomic-habits",
  title: "Atomic Habits",
  status: "not-started",
  author: "James Clear",
  unitSlug: "words",
  ownLength: 83700,
} as const satisfies Book
