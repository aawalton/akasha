import type { Book } from "../../book.page-type.ts"

export const oneTwoBuckleMyShoe = {
  id: "019db533-f399-7c15-bef7-8149e3660284",
  pageTypeSlug: "book",
  slug: "one-two-buckle-my-shoe",
  title: "One, Two, Buckle My Shoe",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 19,
} as const satisfies Book
