import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonTheShortVictoriousWar = {
  id: "019db533-f39a-78d8-9b61-5db9a54c985a",
  type: "page-type/book",
  slug: "honor-harrington-the-short-victorious-war",
  title: "Honor Harrington: The Short Victorious War",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 2,
  ownLength: 90000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP9XIK0",
      externalLink: "https://www.amazon.com/dp/B00AP9XIK0",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
