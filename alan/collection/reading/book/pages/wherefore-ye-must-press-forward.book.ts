import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whereforeYeMustPressForward = {
  id: "019db533-f39c-7fba-9cd6-38aab60fc370",
  type: "page-type/book",
  slug: "wherefore-ye-must-press-forward",
  title: "Wherefore, Ye Must Press Forward",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 2,
  ownLength: 33250,
  ownProgress: 33250,
} as const satisfies Book
