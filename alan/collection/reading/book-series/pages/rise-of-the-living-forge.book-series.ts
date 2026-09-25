import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const riseOfTheLivingForge = {
  id: "019db533-f38b-77be-bff6-30269263a6ac",
  type: "page-type/book-series",
  slug: "rise-of-the-living-forge",
  title: "Rise of the Living Forge",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D8XWFGDG",
      externalLink: "https://www.amazon.com/dp/B0D8XWFGDG",
      lastSyncedAt: "2026-03-23",
    },
  ],
} as const satisfies BookSeries
