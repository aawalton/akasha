import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const pathToProsperity = {
  id: "019db533-f38b-77ce-8055-7c25cda0a728",
  type: "page-type/book-series",
  slug: "path-to-prosperity",
  title: "Path to Prosperity",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FL3K5NDN",
      externalLink: "https://www.amazon.com/dp/B0FL3K5NDN",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
