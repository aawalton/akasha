import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTimeToChoose = {
  id: "019db533-f39d-739d-b886-3f628b90a862",
  type: "page-type/book",
  slug: "a-time-to-choose",
  title: "A Time to Choose",
  status: "completed",
  grade: "C",
  author: "Richard Parker",
  unit: "unit/words",
  position: 4,
  ownLength: 22250,
  ownProgress: 22250,
} as const satisfies Book
