import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aWonderfulFloodOfLight = {
  id: "019db533-f39d-736f-aada-13159c00e30e",
  type: "page-type/book",
  slug: "a-wonderful-flood-of-light",
  title: "A Wonderful Flood of Light",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 4,
  ownLength: 31750,
  ownProgress: 31750,
} as const satisfies Book
