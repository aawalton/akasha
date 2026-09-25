import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const snapshot = {
  id: "019db533-f39d-7254-85c8-766ab7d3ae04",
  type: "page-type/book",
  slug: "snapshot",
  title: "Snapshot",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 26750,
  ownProgress: 26750,
} as const satisfies Book
