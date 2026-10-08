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
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
