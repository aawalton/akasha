import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const davidAndGoliath = {
  id: "019db533-f39e-71de-b3d4-a75f27ff6f4c",
  type: "page-type/book",
  slug: "david-and-goliath",
  title: "David and Goliath",
  status: "not-started",
  author: "Malcolm Gladwell",
  unit: "unit/words",
  ownLength: 105300,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
