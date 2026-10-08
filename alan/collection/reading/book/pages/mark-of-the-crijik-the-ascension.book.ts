import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheCrijikTheAscension = {
  id: "019db533-f391-7199-be5f-056859a542fb",
  type: "page-type/book",
  slug: "mark-of-the-crijik-the-ascension",
  title: "Mark of the Crijik: The Ascension",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 169500,
  publishedAt: "2024-03-06",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CK58ZS4S",
      externalLink: "https://amazon.com/dp/B0CK58ZS4S",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
