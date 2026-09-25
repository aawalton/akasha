import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganFallingFree = {
  id: "019db533-f39a-7fbf-affb-fdc9ffe827aa",
  type: "page-type/book",
  slug: "miles-vorsokigan-falling-free",
  title: "Miles Vorsokigan: Falling Free",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 75000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005SHX1CE",
      externalLink: "https://www.amazon.com/dp/B005SHX1CE",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
