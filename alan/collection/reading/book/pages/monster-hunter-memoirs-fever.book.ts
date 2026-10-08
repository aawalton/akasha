import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const monsterHunterMemoirsFever = {
  id: "019db533-f39a-7e49-b477-62bd6a790577",
  type: "page-type/book",
  slug: "monster-hunter-memoirs-fever",
  title: "Monster Hunter Memoirs: Fever",
  status: "not-started",
  author: "Larry Correia, John Ringo, Oliver Wyman",
  unit: "unit/words",
  position: 3,
  ownLength: 88000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C32DYSYS",
      externalLink: "https://www.amazon.com/dp/B0C32DYSYS",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
