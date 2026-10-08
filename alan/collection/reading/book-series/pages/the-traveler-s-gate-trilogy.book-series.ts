import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theTravelerSGateTrilogy = {
  id: "019db533-f39b-74d0-b323-2873189b7d8e",
  type: "page-type/book-series",
  slug: "the-traveler-s-gate-trilogy",
  title: "The Traveler's Gate Trilogy",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CCBXYZ",
      externalLink: "https://www.amazon.com/dp/B074CCBXYZ",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
