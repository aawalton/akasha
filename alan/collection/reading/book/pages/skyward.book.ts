import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const skyward = {
  id: "019db533-f39c-7ff5-8135-891e7ee0c611",
  type: "page-type/book",
  slug: "skyward",
  title: "Skyward",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 1,
  ownLength: 128250,
  ownProgress: 128250,
} as const satisfies Book
