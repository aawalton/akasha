import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganCryoburn = {
  id: "019db533-f39b-7129-a07d-9fe2779423db",
  type: "page-type/book",
  slug: "miles-vorsokigan-cryoburn",
  title: "Miles Vorsokigan: CryoBurn",
  status: "not-started",
  unit: "unit/words",
  position: 13,
  ownLength: 92000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00514K032",
      externalLink: "https://www.amazon.com/dp/B00514K032",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
