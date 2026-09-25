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
} as const satisfies Book
