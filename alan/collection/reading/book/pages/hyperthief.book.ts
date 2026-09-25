import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hyperthief = {
  id: "019db533-f39c-7f5c-8432-ae3745fe8782",
  type: "page-type/book",
  slug: "hyperthief",
  title: "Hyperthief",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson, Janci Patterson",
  unit: "unit/words",
  position: 4,
  ownLength: 5500,
  ownProgress: 5500,
} as const satisfies Book
