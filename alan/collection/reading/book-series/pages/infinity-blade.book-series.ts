import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const infinityBlade = {
  id: "019db533-f39d-74b4-b6e3-0a6a17687940",
  type: "page-type/book-series",
  slug: "infinity-blade",
  title: "Infinity Blade",
  status: "completed",
  unit: "unit/words",
  position: 8,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CGRSN4",
      externalLink: "https://www.amazon.com/dp/B074CGRSN4",
      lastSyncedAt: "2025-10-15",
    },
  ],
} as const satisfies BookSeries
