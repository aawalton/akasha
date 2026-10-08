import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheCrijikGestiSky = {
  id: "019db533-f391-71e0-98ed-df451f3f281f",
  type: "page-type/book",
  slug: "mark-of-the-crijik-gesti-sky",
  title: "Mark of the Crijik: Gesti Sky",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 112000,
  publishedAt: "2023-05-02",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BT6JWBL3",
      externalLink: "https://amazon.com/dp/B0BT6JWBL3",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
