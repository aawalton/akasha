import type { Book } from "../../book.page-type.ts"

export const starsight = {
  id: "019db533-f39d-700d-a96d-d2d3376e0b39",
  pageTypeSlug: "book",
  slug: "starsight",
  title: "Starsight",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 2,
  ownLength: 115250,
  ownProgress: 115250,
} as const satisfies Book
