import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theRobotTheCavesOfSteel = {
  id: "019db533-f39a-7a79-b3c3-e688ba3ed9bb",
  type: "page-type/book",
  slug: "the-robot-the-caves-of-steel",
  title: "The Robot: The Caves of Steel",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  ownLength: 68000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004JHYRAO",
      externalLink: "https://www.amazon.com/dp/B004JHYRAO",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
