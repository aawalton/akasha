import type { Book } from "../../book.page-type.ts"

export const oneMoreStrainOfPraise = {
  id: "019db533-f39d-705d-9a96-32794cbe0aa5",
  pageTypeSlug: "book",
  slug: "one-more-strain-of-praise",
  title: "One More Strain of Praise",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 4,
  ownLength: 35250,
  ownProgress: 35250,
} as const satisfies Book
