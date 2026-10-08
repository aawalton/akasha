import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cytonic = {
  id: "019db533-f39c-7f6c-8542-d6c871039189",
  type: "page-type/book",
  slug: "cytonic",
  title: "Cytonic",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 103750,
  ownProgress: 103750,
  createdAt: "2026-04-22T12:39:34.044Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
