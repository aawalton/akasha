import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bookSeries1Lifesteal = {
  id: "019db533-f38b-795f-9e68-08d55ab607b5",
  type: "page-type/book-series",
  slug: "book-series-1-lifesteal",
  title: "1% Lifesteal",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGWCJ6JP",
      externalLink: "https://www.amazon.com/dp/B0DGWCJ6JP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
