import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheFool6 = {
  id: "019db533-f391-7250-8108-8255e93818fc",
  type: "page-type/book",
  slug: "mark-of-the-fool-6",
  title: "Mark of the Fool 6",
  status: "completed",
  author: "Mark Twain",
  unit: "unit/words",
  position: 6,
  ownLength: 178000,
  ownProgress: 178000,
  publishedAt: "2024-02-07",
  partOfCollections: ["book-series/mark-of-the-fool"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CKJS2PLQ",
      externalLink: "https://amazon.com/dp/B0CKJS2PLQ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
