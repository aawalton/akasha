import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesWithTheLightnings = {
  id: "019db533-f39a-781b-a97f-ae8ffb2a90b8",
  type: "page-type/book",
  slug: "rcn-series-with-the-lightnings",
  title: "RCN Series: With the Lightnings",
  status: "not-started",
  unit: "unit/words",
  ownLength: 105000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00B4HARJM",
      externalLink: "https://www.amazon.com/dp/B00B4HARJM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
