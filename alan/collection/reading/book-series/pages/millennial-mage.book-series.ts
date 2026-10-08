import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const millennialMage = {
  id: "019db533-f38b-77d7-9f88-ec8dc4613690",
  type: "page-type/book-series",
  slug: "millennial-mage",
  title: "Millennial Mage",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BX4S6LJG",
      externalLink: "https://www.amazon.com/dp/B0BX4S6LJG",
      lastSyncedAt: "2026-02-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
