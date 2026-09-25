import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTreasuryOfTheWorldsBestLovePoems = {
  id: "019db533-f39d-7c84-96e0-57e891d4956a",
  type: "page-type/book",
  slug: "a-treasury-of-the-worlds-best-love-poems",
  title: "A Treasury of the World's Best Love Poems",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 3,
  ownLength: 44250,
  ownProgress: 44250,
} as const satisfies Book
