import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganEthanOfAthos = {
  id: "019db533-f39a-7fc7-9f32-5b30c44ef878",
  type: "page-type/book",
  slug: "miles-vorsokigan-ethan-of-athos",
  title: "Miles Vorsokigan: Ethan of Athos",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 59500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0055EFASI",
      externalLink: "https://www.amazon.com/dp/B0055EFASI",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
