import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesTheRoadOfDanger = {
  id: "019db533-f39a-79cd-a66d-700f6fa62ec6",
  type: "page-type/book",
  slug: "rcn-series-the-road-of-danger",
  title: "RCN Series: The Road of Danger",
  status: "not-started",
  unit: "unit/words",
  position: 8,
  ownLength: 112750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APA1C7K",
      externalLink: "https://www.amazon.com/dp/B00APA1C7K",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
