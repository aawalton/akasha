import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonHonorAmongEnemies = {
  id: "019db533-f39b-7072-9cca-b27bd04a4ea3",
  type: "page-type/book",
  slug: "honor-harrington-honor-among-enemies",
  title: "Honor Harrington: Honor Among Enemies",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 5,
  ownLength: 139000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APAH4YU",
      externalLink: "https://www.amazon.com/dp/B00APAH4YU",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
