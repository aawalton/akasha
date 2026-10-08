import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const emilyDickinson = {
  id: "019db533-f39d-794b-9bc8-189692535d77",
  type: "page-type/book",
  slug: "emily-dickinson",
  title: "Emily Dickinson",
  status: "paused",
  author: "Thomas Herbert Johnson",
  unit: "unit/words",
  position: 1,
  ownLength: 79000,
  ownProgress: 2250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
