import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganTheVorGame = {
  id: "019db533-f39a-7876-911b-590b6244e8c7",
  type: "page-type/book",
  slug: "miles-vorsokigan-the-vor-game",
  title: "Miles Vorsokigan: The Vor Game",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 90750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005O2WQ60",
      externalLink: "https://www.amazon.com/dp/B005O2WQ60",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
