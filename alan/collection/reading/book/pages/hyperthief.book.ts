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
  createdAt: "2026-04-22T12:39:34.044Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
