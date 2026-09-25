import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aMoreExcellentWay = {
  id: "019db533-f39d-737e-97ba-6b4dfd78d5db",
  type: "page-type/book",
  slug: "a-more-excellent-way",
  title: '"...A More Excellent Way"',
  status: "completed",
  grade: "C",
  author: "Henry Wright",
  unit: "unit/words",
  position: 1,
  ownLength: 34750,
  ownProgress: 34750,
} as const satisfies Book
