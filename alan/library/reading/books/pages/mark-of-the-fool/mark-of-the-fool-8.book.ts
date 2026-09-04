import type { Book } from "../../book.page-type.ts"

export const markOfTheFool8 = {
  id: "019db533-f391-7203-b674-56b7bba85ae4",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-8",
  title: "Mark of the Fool 8",
  kind: "read",
  status: "completed",
  author: "Mark Twain",
  unitSlug: "words",
  position: 8,
  ownLength: 169750,
  ownProgress: 169750,
  publishedAt: "2024-09-18",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0D3G9154S",
  externalLink: "https://amazon.com/dp/B0D3G9154S",
} as const satisfies Book
