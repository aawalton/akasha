import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganShardsOfHonor = {
  id: "019db533-f39a-7c2e-9786-212cb1626383",
  type: "page-type/book",
  slug: "miles-vorsokigan-shards-of-honor",
  title: "Miles Vorsokigan: Shards of Honor",
  status: "not-started",
  unit: "unit/words",
  ownLength: 73750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005BH9T86",
      externalLink: "https://www.amazon.com/dp/B005BH9T86",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
