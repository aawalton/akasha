import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thatMyFamilyShouldPartake = {
  id: "019db533-f39d-720f-80ec-64a1938b3957",
  type: "page-type/book",
  slug: "that-my-family-should-partake",
  title: "That My Family Should Partake",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 3,
  ownLength: 30500,
  ownProgress: 30500,
} as const satisfies Book
