import type { Book } from "../../book.page-type.ts"

export const markOfTheFool6 = {
  id: "019db533-f391-7250-8108-8255e93818fc",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-6",
  title: "Mark of the Fool 6",
  kind: "read",
  status: "completed",
  author: "Mark Twain",
  unitSlug: "words",
  position: 6,
  ownLength: 178000,
  ownProgress: 178000,
  publishedAt: "2024-02-07",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0CKJS2PLQ",
  externalLink: "https://amazon.com/dp/B0CKJS2PLQ",
} as const satisfies Book
