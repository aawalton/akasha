import type { Book } from "../../book.page-type.ts"

export const thatMyFamilyShouldPartake = {
  id: "019db533-f39d-720f-80ec-64a1938b3957",
  pageTypeSlug: "book",
  slug: "that-my-family-should-partake",
  title: "That My Family Should Partake",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 3,
  ownLength: 30500,
  ownProgress: 30500,
} as const satisfies Book
