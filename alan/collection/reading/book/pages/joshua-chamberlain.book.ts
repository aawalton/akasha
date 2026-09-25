import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const joshuaChamberlain = {
  id: "019db533-f39d-79c4-9f2f-cf9f4fd16e93",
  type: "page-type/book",
  slug: "joshua-chamberlain",
  title: "Joshua Chamberlain",
  status: "completed",
  grade: "C",
  author: "John J. Pullen",
  unit: "unit/words",
  position: 4,
  ownLength: 47250,
  ownProgress: 47250,
} as const satisfies Book
