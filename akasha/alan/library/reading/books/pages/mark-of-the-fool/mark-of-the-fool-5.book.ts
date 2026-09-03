import type { Book } from "../../book.page-type.ts"

export const markOfTheFool5 = {
  id: "019db533-f391-7235-9235-f54f7514943c",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-5",
  title: "Mark of the Fool 5",
  kind: "read",
  status: "completed",
  author: "Mark Twain",
  unitSlug: "words",
  position: 5,
  ownLength: 143000,
  ownProgress: 143000,
  publishedAt: "2023-10-09",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0CBCXC1GQ",
  externalLink: "https://amazon.com/dp/B0CBCXC1GQ",
} as const satisfies Book
