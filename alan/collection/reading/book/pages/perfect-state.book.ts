import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const perfectState = {
  id: "019db533-f39d-70ab-a06a-9fb76a7e8a14",
  type: "page-type/book",
  slug: "perfect-state",
  title: "Perfect State",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 2,
  ownLength: 230000,
  ownProgress: 230000,
} as const satisfies Book
