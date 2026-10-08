import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const riseOfTheDevourerAbyssalRift = {
  id: "019db533-f391-74f2-8dfd-931a0759ffab",
  type: "page-type/book",
  slug: "rise-of-the-devourer-abyssal-rift",
  title: "Rise of the Devourer: Abyssal Rift",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 142000,
  publishedAt: "2024-01-24",
  partOfCollections: ["book-series/rise-of-the-devourer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CKZHJDF4",
      externalLink: "https://amazon.com/dp/B0CKZHJDF4",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
