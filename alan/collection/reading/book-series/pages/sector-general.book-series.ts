import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const sectorGeneral = {
  id: "019db533-f39b-7414-993a-34a7196e54c6",
  type: "page-type/book-series",
  slug: "sector-general",
  title: "Sector General",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09N9DMYFB",
      externalLink: "https://www.amazon.com/dp/B09N9DMYFB",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
