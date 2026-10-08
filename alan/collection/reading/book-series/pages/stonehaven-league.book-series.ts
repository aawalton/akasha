import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const stonehavenLeague = {
  id: "019db533-f38b-76c2-a8bf-581139399696",
  type: "page-type/book-series",
  slug: "stonehaven-league",
  title: "Stonehaven League",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07DYF99N1",
      externalLink: "https://www.amazon.com/dp/B07DYF99N1",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
