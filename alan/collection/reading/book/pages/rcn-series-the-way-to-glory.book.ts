import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesTheWayToGlory = {
  id: "019db533-f39a-7943-afd5-cf8bd9a3cae5",
  type: "page-type/book",
  slug: "rcn-series-the-way-to-glory",
  title: "RCN Series: The Way to Glory",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 106000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP9CPCM",
      externalLink: "https://www.amazon.com/dp/B00AP9CPCM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
