import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const powderMage = {
  id: "019db533-f39b-7598-a4a9-d0fa97321bc7",
  type: "page-type/book-series",
  slug: "powder-mage",
  title: "Powder Mage",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07F7RYRYC",
      externalLink: "https://www.amazon.com/dp/B07F7RYRYC",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
