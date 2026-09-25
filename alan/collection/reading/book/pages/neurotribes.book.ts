import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const neurotribes = {
  id: "019db533-f39e-702a-b7f3-9a5763751f41",
  type: "page-type/book",
  slug: "neurotribes",
  title: "NeuroTribes",
  status: "completed",
  grade: "A",
  author: "Steve Silberman",
  unit: "unit/words",
  ownLength: 281550,
  ownProgress: 281550,
} as const satisfies Book
