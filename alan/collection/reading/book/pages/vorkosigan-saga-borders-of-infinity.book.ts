import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vorkosiganSagaBordersOfInfinity = {
  id: "019db533-f39b-7140-b424-72748107a0d4",
  type: "page-type/book",
  slug: "vorkosigan-saga-borders-of-infinity",
  title: "Vorkosigan Saga: Borders of Infinity",
  status: "not-started",
  author: "Lois McMaster Bujold",
  unit: "unit/words",
  position: 4,
  ownLength: 76250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0062CKP2S",
      externalLink: "https://www.amazon.com/dp/B0062CKP2S",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
