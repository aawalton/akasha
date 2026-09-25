import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const honorHarringtonSaganamiIsland = {
  id: "019db533-f39b-7528-9852-bc4e8afe7005",
  type: "page-type/book-series",
  slug: "honor-harrington-saganami-island",
  title: "Honor Harrington: Saganami Island",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C3ZWGVHG",
      externalLink: "https://www.amazon.com/dp/B0C3ZWGVHG",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
