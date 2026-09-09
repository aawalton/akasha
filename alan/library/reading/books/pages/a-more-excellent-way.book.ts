import type { Book } from "../book.page-type.ts"

export const aMoreExcellentWay = {
  id: "019db533-f39d-737e-97ba-6b4dfd78d5db",
  pageTypeSlug: "book",
  type: "book",
  slug: "a-more-excellent-way",
  title: '"...A More Excellent Way"',
  status: "completed",
  rank: "C",
  author: "Henry Wright",
  unit: "words",
  position: 1,
  ownLength: 34750,
  ownProgress: 34750,
} as const satisfies Book
