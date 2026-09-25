import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const evershore = {
  id: "019db533-f39c-7f8a-9bb5-62a9f0c05a6a",
  type: "page-type/book",
  slug: "evershore",
  title: "Evershore",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "unit/words",
  position: 3,
  ownLength: 103500,
  ownProgress: 103500,
} as const satisfies Book
