import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganCetaganda = {
  id: "019db533-f39b-7219-a7a3-7717adb3f2ec",
  type: "page-type/book",
  slug: "miles-vorsokigan-cetaganda",
  title: "Miles Vorsokigan: Cetaganda",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 77500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B007XFJDYO",
      externalLink: "https://www.amazon.com/dp/B007XFJDYO",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
