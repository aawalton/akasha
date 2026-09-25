import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheFool7 = {
  id: "019db533-f391-7241-8d91-3f73aa2f60af",
  type: "page-type/book",
  slug: "mark-of-the-fool-7",
  title: "Mark of the Fool 7",
  status: "completed",
  author: "J.M. Clarke",
  unit: "unit/words",
  position: 7,
  ownLength: 170000,
  ownProgress: 170000,
  publishedAt: "2024-05-15",
  partOfCollections: ["book-series/mark-of-the-fool"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CT9THG99",
      externalLink: "https://amazon.com/dp/B0CT9THG99",
    },
  ],
} as const satisfies Book
