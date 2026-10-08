import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesTheSeaWithoutAShore = {
  id: "019db533-f39a-789b-ac93-569289471088",
  type: "page-type/book",
  slug: "rcn-series-the-sea-without-a-shore",
  title: "RCN Series: The Sea Without a Shore",
  status: "not-started",
  unit: "unit/words",
  position: 9,
  ownLength: 115500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00JQEDABC",
      externalLink: "https://www.amazon.com/dp/B00JQEDABC",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
