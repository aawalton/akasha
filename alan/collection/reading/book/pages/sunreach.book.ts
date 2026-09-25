import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sunreach = {
  id: "019db533-f39c-7f74-917a-a7b9bc781a8e",
  type: "page-type/book",
  slug: "sunreach",
  title: "Sunreach",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "unit/words",
  position: 1,
  ownLength: 78500,
  ownProgress: 78500,
} as const satisfies Book
