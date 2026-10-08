import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const monsterHunterMemoirsSinners = {
  id: "019db533-f39a-7f48-be12-52b6cef0c27f",
  type: "page-type/book",
  slug: "monster-hunter-memoirs-sinners",
  title: "Monster Hunter Memoirs: Sinners",
  status: "not-started",
  author: "Larry Correia, John Ringo",
  unit: "unit/words",
  position: 1,
  ownLength: 64500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01N5CUEA7",
      externalLink: "https://www.amazon.com/dp/B01N5CUEA7",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
