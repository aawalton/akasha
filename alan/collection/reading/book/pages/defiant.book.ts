import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defiant = {
  id: "019db533-f39c-7fff-89d0-2bc7b1b8eb0c",
  type: "page-type/book",
  slug: "defiant",
  title: "Defiant",
  status: "completed",
  grade: "B",
  author: "Lynne Graham",
  unit: "unit/words",
  position: 4,
  ownLength: 105000,
  ownProgress: 105000,
} as const satisfies Book
