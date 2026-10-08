import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theLegendaryFool = {
  id: "019db533-f38b-766a-b7e7-3f3fada242ae",
  type: "page-type/book-series",
  slug: "the-legendary-fool",
  title: "The Legendary Fool",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DB23X26X",
      externalLink: "https://www.amazon.com/dp/B0DB23X26X",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
