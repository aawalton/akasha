import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const atomicHabits = {
  id: "019db533-f39e-712a-aa9b-0240baec3ed1",
  type: "book",
  slug: "atomic-habits",
  title: "Atomic Habits",
  status: "not-started",
  author: "James Clear",
  unit: "words",
  ownLength: 83700,
} as const satisfies Book
