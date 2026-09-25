import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const redawn = {
  id: "019db533-f39c-7fc9-89d8-10cfdc0bd50b",
  type: "page-type/book",
  slug: "redawn",
  title: "ReDawn",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "unit/words",
  position: 2,
  ownLength: 104250,
  ownProgress: 104250,
} as const satisfies Book
