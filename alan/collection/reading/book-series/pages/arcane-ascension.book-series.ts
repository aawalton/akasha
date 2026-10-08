import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const arcaneAscension = {
  id: "019db533-f38a-743e-8a6a-f644c03de2d8",
  type: "page-type/book-series",
  slug: "arcane-ascension",
  title: "Arcane Ascension",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07P6T5K3Y",
      externalLink: "https://www.amazon.com/Arcane-Ascension/dp/B07P6T5K3Y",
      lastSyncedAt: "2025-11-22",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
