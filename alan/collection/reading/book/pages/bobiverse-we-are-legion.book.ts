import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bobiverseWeAreLegion = {
  id: "019db533-f39a-780c-b6b0-cbe9ad550c16",
  type: "page-type/book",
  slug: "bobiverse-we-are-legion",
  title: "Bobiverse: We Are Legion",
  status: "not-started",
  author: "Dennis E. Taylor",
  unit: "unit/words",
  ownLength: 95750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01LWAESYQ",
      externalLink: "https://www.amazon.com/dp/B01LWAESYQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
