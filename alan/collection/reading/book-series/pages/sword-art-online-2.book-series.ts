import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const swordArtOnline2 = {
  id: "019db533-f38b-73f2-9612-a2651ea05e15",
  type: "page-type/book-series",
  slug: "sword-art-online-2",
  title: "Sword Art Online",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07ZTQ8K6D",
      externalLink: "https://www.amazon.com/dp/B07ZTQ8K6D",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
