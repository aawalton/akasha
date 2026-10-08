import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTheDragonReborn = {
  id: "019db533-f39a-7bdd-b90f-dd7239ab70cd",
  type: "page-type/book",
  slug: "wheel-of-time-the-dragon-reborn",
  title: "Wheel of Time: The Dragon Reborn",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 3,
  ownLength: 168250,
  ownProgress: 168250,
  publishedAt: "2009-12-09",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0030AF5DO",
      externalLink: "https://amazon.com/dp/B0030AF5DO",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
