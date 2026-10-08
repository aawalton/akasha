import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldMovingPictures = {
  id: "019db533-f39a-7d89-97b3-3c76d32b77e4",
  type: "page-type/book",
  slug: "discworld-moving-pictures",
  title: "Discworld: Moving Pictures",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 10,
  ownLength: 103500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000UVBT3G",
      externalLink: "https://www.amazon.com/dp/B000UVBT3G",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
