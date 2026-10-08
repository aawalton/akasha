import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const chalion = {
  id: "019db533-f39a-701f-8aee-ee3bc821974f",
  type: "page-type/book-series",
  slug: "chalion",
  title: "Chalion",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BHTDLHS7",
      externalLink: "https://www.amazon.com/dp/B0BHTDLHS7",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
