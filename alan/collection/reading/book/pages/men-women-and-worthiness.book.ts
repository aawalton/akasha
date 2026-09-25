import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const menWomenAndWorthiness = {
  id: "019db533-f39e-70cc-b976-068f53d13e6e",
  type: "page-type/book",
  slug: "men-women-and-worthiness",
  title: "Men, Women, and Worthiness",
  status: "completed",
  grade: "B",
  author: "Brené Brown",
  unit: "unit/words",
  ownLength: 33450,
  ownProgress: 33450,
} as const satisfies Book
