import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries15 = {
  id: "019db533-f38a-7459-ac3d-48504d05d09a",
  type: "page-type/book-series",
  slug: "unknown-series-15",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07X2M9J9T",
      externalLink: "https://www.amazon.com/Wolfman-Warlock/dp/B07X2M9J9T",
      lastSyncedAt: "2025-11-22",
    },
  ],
} as const satisfies BookSeries
