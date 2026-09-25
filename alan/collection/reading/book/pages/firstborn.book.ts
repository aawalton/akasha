import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const firstborn = {
  id: "019db533-f39d-723d-b9fb-d70f21720159",
  type: "page-type/book",
  slug: "firstborn",
  title: "Firstborn",
  status: "completed",
  grade: "B",
  author: "Karen Kingsbury",
  unit: "unit/words",
  position: 1,
  ownLength: 19250,
  ownProgress: 19250,
} as const satisfies Book
