import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const lordIncreaseOurFaith = {
  id: "019db533-f39d-7264-aab7-f6d7cf50318d",
  type: "page-type/book",
  slug: "lord-increase-our-faith",
  title: "Lord, Increase Our Faith",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 2,
  ownLength: 30000,
  ownProgress: 30000,
} as const satisfies Book
