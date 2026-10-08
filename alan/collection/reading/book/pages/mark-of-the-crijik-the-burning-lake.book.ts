import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheCrijikTheBurningLake = {
  id: "019db533-f391-71a4-8f63-b2aa7ef4224d",
  type: "page-type/book",
  slug: "mark-of-the-crijik-the-burning-lake",
  title: "Mark of the Crijik: The Burning Lake",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 113500,
  publishedAt: "2023-10-04",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C3LDKWTC",
      externalLink: "https://amazon.com/dp/B0C3LDKWTC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
