import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const worldTreeTrilogy = {
  id: "019db533-f38b-761e-8016-1a0b865db48f",
  type: "page-type/book-series",
  slug: "world-tree-trilogy",
  title: "World-Tree Trilogy",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07PGLH5GW",
      externalLink: "https://www.amazon.com/dp/B07PGLH5GW",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
