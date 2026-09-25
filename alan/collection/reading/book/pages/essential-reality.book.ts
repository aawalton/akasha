import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const essentialReality = {
  id: "019db533-f39e-71bd-9710-3a75d7814fc6",
  type: "page-type/book",
  slug: "essential-reality",
  title: "Essential Reality",
  status: "completed",
  grade: "C",
  author: "Jason Fried, David Heinemeier Hansson",
  unit: "unit/words",
  ownLength: 14250,
  ownProgress: 14250,
} as const satisfies Book
