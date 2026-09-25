import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defendingElysium = {
  id: "019db533-f39d-71b8-a266-3eafe03b2539",
  type: "page-type/book",
  slug: "defending-elysium",
  title: "Defending Elysium",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 20750,
  ownProgress: 20750,
} as const satisfies Book
