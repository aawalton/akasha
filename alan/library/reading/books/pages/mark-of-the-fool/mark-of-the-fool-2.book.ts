import type { Book } from "../../book.page-type.ts"

export const markOfTheFool2 = {
  id: "019db533-f391-7229-8d3c-ea0b98fa921b",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-2",
  title: "Mark of the Fool 2",
  status: "completed",
  author: "Jim Butcher, Mark Powers, Chase Conley, Tyler Walpole, James Marsters",
  unitSlug: "words",
  position: 2,
  ownLength: 130500,
  ownProgress: 130500,
  publishedAt: "2023-01-10",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0BFCD4LM5",
  externalLink: "https://amazon.com/dp/B0BFCD4LM5",
} as const satisfies Book
