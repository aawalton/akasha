import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const somniaOnline = {
  id: "019db533-f38b-76f2-bc00-16c96ba019ea",
  type: "page-type/book-series",
  slug: "somnia-online",
  title: "Somnia Online",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07GVDX3G8",
      externalLink: "https://www.amazon.com/dp/B07GVDX3G8",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
