import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bobiverseAllTheseWorlds = {
  id: "019db533-f39b-7299-a6ac-1dba25c6ee62",
  type: "page-type/book",
  slug: "bobiverse-all-these-worlds",
  title: "Bobiverse: All These Worlds",
  status: "not-started",
  author: "Dennis E. Taylor",
  unit: "unit/words",
  position: 2,
  ownLength: 70500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0736185ZL",
      externalLink: "https://www.amazon.com/dp/B0736185ZL",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
