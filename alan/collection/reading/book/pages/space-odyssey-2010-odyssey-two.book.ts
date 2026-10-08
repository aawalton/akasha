import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const spaceOdyssey2010OdysseyTwo = {
  id: "019db533-f39b-747f-9068-ac55382629cf",
  type: "page-type/book",
  slug: "space-odyssey-2010-odyssey-two",
  title: "Space Odyssey: 2010: Odyssey Two",
  status: "not-started",
  author: "Arthur C. Clarke",
  unit: "unit/words",
  position: 1,
  ownLength: 80500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07XG1S8LM",
      externalLink: "https://www.amazon.com/dp/B07XG1S8LM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
