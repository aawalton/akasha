import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganBarrayar = {
  id: "019db533-f39b-71b9-a3b2-b895eaad3359",
  type: "page-type/book",
  slug: "miles-vorsokigan-barrayar",
  title: "Miles Vorsokigan: Barrayar",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005BFIH7M",
      externalLink: "https://www.amazon.com/dp/B005BFIH7M",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
