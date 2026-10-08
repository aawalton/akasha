import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganBrothersInArms = {
  id: "019db533-f39b-71f1-b3eb-971c7224818a",
  type: "page-type/book",
  slug: "miles-vorsokigan-brothers-in-arms",
  title: "Miles Vorsokigan: Brothers in Arms",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 83000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005S4FLCK",
      externalLink: "https://www.amazon.com/dp/B005S4FLCK",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
