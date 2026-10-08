import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bunnyGirlEvolution2 = {
  id: "019db533-f38b-7600-949d-1a714b3ea21f",
  type: "page-type/book",
  slug: "bunny-girl-evolution-2",
  title: "Bunny Girl Evolution 2",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 152250,
  ownProgress: 152250,
  publishedAt: "2025-10-01",
  partOfCollections: ["book-series/bunny-girl-evolution"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FJ6QRBBW",
      externalLink: "https://amazon.com/dp/B0FJ6QRBBW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
