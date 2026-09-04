import type { Book } from "../../book.page-type.ts"

export const markOfTheFool9 = {
  id: "019db533-f391-71fb-aebc-2194754e925f",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-9",
  title: "Mark of the Fool 9",
  status: "completed",
  author: "Mark Twain",
  unitSlug: "words",
  position: 9,
  ownLength: 209750,
  ownProgress: 209750,
  publishedAt: "2025-02-12",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0DGLYQTKR",
  externalLink: "https://amazon.com/dp/B0DGLYQTKR",
} as const satisfies Book
