import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsSonsOfTheOak = {
  id: "019db533-f39a-7b68-8284-b9b13a1f78c9",
  type: "page-type/book",
  slug: "runelords-sons-of-the-oak",
  title: "Runelords: Sons of the Oak",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 4,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000Q9ISOU",
      externalLink: "https://www.amazon.com/dp/B000Q9ISOU",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
