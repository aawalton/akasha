import type { Book } from "../../book.page-type.ts"

export const markOfTheFool7 = {
  id: "019db533-f391-7241-8d91-3f73aa2f60af",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-7",
  title: "Mark of the Fool 7",
  kind: "read",
  status: "completed",
  author: "J.M. Clarke",
  unitSlug: "words",
  position: 7,
  ownLength: 170000,
  ownProgress: 170000,
  publishedAt: "2024-05-15",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0CT9THG99",
  externalLink: "https://amazon.com/dp/B0CT9THG99",
} as const satisfies Book
