import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganGentlemanJoleAndTheRedQueen = {
  id: "019db533-f39b-711b-84ba-fece2c41d58c",
  type: "page-type/book",
  slug: "miles-vorsokigan-gentleman-jole-and-the-red-queen",
  title: "Miles Vorsokigan: Gentleman Jole and the Red Queen",
  status: "not-started",
  unit: "unit/words",
  position: 15,
  ownLength: 95500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01BGTZ5EY",
      externalLink: "https://www.amazon.com/dp/B01BGTZ5EY",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
