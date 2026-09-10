import type { Book } from "../book.page-type.types.ts"

export const markOfTheFool4 = {
  id: "019db533-f391-725a-9603-187842b4d72e",
  pageTypeSlug: "book",
  type: "book",
  slug: "mark-of-the-fool-4",
  title: "Mark of the Fool 4",
  status: "completed",
  author: "Mark Twain",
  unit: "words",
  position: 4,
  ownLength: 150000,
  ownProgress: 150000,
  publishedAt: "2023-07-19",
  partOfCollections: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0C1HHNWLB",
  externalLink: "https://amazon.com/dp/B0C1HHNWLB",
} as const satisfies Book
