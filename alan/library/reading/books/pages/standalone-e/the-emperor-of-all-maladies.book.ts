import type { Book } from "../../book.page-type.ts"

export const theEmperorOfAllMaladies = {
  id: "019db533-f39d-7def-9ac5-fb3e8dc58ce2",
  pageTypeSlug: "book",
  slug: "the-emperor-of-all-maladies",
  title: "The Emperor of All Maladies",
  status: "completed",
  rank: "B",
  author: "Siddhartha Mukherjee, Nessa Carey",
  unitSlug: "words",
  ownLength: 311250,
  ownProgress: 311250,
} as const satisfies Book
