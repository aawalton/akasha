import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganMemory = {
  id: "019db533-f39a-7f34-aac7-2e2bfa21aecc",
  type: "page-type/book",
  slug: "miles-vorsokigan-memory",
  title: "Miles Vorsokigan: Memory",
  status: "not-started",
  unit: "unit/words",
  position: 9,
  ownLength: 121000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005LI3W9W",
      externalLink: "https://www.amazon.com/dp/B005LI3W9W",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
