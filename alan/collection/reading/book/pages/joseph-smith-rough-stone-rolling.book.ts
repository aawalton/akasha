import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const josephSmithRoughStoneRolling = {
  id: "019db533-f39d-7a2a-8f91-85be8e1ded5f",
  type: "page-type/book",
  slug: "joseph-smith-rough-stone-rolling",
  title: "Joseph Smith Rough Stone Rolling",
  status: "not-started",
  author: "Richard Lyman Bushman",
  unit: "unit/words",
  position: 14,
  ownLength: 140250,
} as const satisfies Book
