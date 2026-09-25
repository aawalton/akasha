import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const atomicHabits = {
  id: "019db533-f39e-712a-aa9b-0240baec3ed1",
  type: "page-type/book",
  slug: "atomic-habits",
  title: "Atomic Habits",
  status: "not-started",
  author: "James Clear",
  unit: "unit/words",
  ownLength: 83700,
} as const satisfies Book
