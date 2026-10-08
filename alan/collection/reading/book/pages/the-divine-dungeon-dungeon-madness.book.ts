import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theDivineDungeonDungeonMadness = {
  id: "019db533-f391-78b9-876a-0c233429183c",
  type: "page-type/book",
  slug: "the-divine-dungeon-dungeon-madness",
  title: "The Divine Dungeon: Dungeon Madness",
  status: "completed",
  author: "Dakota Krout",
  unit: "unit/words",
  position: 2,
  ownLength: 97000,
  ownProgress: 97000,
  publishedAt: "2019-05-09",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07RP69LFQ",
      externalLink: "https://amazon.com/dp/B07RP69LFQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
