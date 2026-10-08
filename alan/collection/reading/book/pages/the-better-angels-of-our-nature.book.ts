import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBetterAngelsOfOurNature = {
  id: "019db533-f39e-7096-a7d8-2b3b8adbff20",
  type: "page-type/book",
  slug: "the-better-angels-of-our-nature",
  title: "The Better Angels of Our Nature",
  status: "completed",
  grade: "A",
  author: "Steven Pinker",
  unit: "unit/words",
  ownLength: 549750,
  ownProgress: 549750,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
