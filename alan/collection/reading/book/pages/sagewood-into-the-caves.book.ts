import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sagewoodIntoTheCaves = {
  id: "019db533-f391-755d-9264-955d82c8c139",
  type: "page-type/book",
  slug: "sagewood-into-the-caves",
  title: "Sagewood: Into the Caves",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 99000,
  publishedAt: "2024-09-04",
  partOfCollections: ["book-series/sagewood"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D5J34DKD",
      externalLink: "https://amazon.com/dp/B0D5J34DKD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
