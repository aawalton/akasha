import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const davidAndGoliath = {
  id: "019db533-f39e-71de-b3d4-a75f27ff6f4c",
  type: "book",
  slug: "david-and-goliath",
  title: "David and Goliath",
  status: "not-started",
  author: "Malcolm Gladwell",
  unit: "words",
  ownLength: 105300,
} as const satisfies Book
