import type { Book } from "../../book.page-type.ts"

export const theBetterAngelsOfOurNature = {
  id: "019db533-f39e-7096-a7d8-2b3b8adbff20",
  pageTypeSlug: "book",
  slug: "the-better-angels-of-our-nature",
  title: "The Better Angels of Our Nature",
  status: "completed",
  rank: "A",
  author: "Steven Pinker",
  unitSlug: "words",
  ownLength: 549750,
  ownProgress: 549750,
} as const satisfies Book
