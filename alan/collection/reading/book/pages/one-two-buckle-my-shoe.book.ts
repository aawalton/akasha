import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oneTwoBuckleMyShoe = {
  id: "019db533-f399-7c15-bef7-8149e3660284",
  type: "page-type/book",
  slug: "one-two-buckle-my-shoe",
  title: "One, Two, Buckle My Shoe",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 19,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
