import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const monsterHuntersInternationalMonsterHunterSiege = {
  id: "019db533-f39a-7e89-90d2-2cfcdf886eb9",
  type: "page-type/book",
  slug: "monster-hunters-international-monster-hunter-siege",
  title: "Monster Hunters International: Monster Hunter Siege",
  status: "not-started",
  author: "Larry Correia",
  unit: "unit/words",
  position: 5,
  ownLength: 88500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0733GS3VP",
      externalLink: "https://www.amazon.com/dp/B0733GS3VP",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
