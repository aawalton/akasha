import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheCrijikKoshimaAcademy = {
  id: "019db533-f391-71eb-9a85-ba662b61774e",
  type: "page-type/book",
  slug: "mark-of-the-crijik-koshima-academy",
  title: "Mark of the Crijik: Koshima Academy",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 160500,
  publishedAt: "2023-01-31",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BKN5S6L7",
      externalLink: "https://amazon.com/dp/B0BKN5S6L7",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
