import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bewareOfChicken = {
  id: "019db533-f38b-78ef-a349-fc8e3df4aa8a",
  type: "page-type/book-series",
  slug: "beware-of-chicken",
  title: "Beware of Chicken",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPX1DX87",
      externalLink: "https://www.amazon.com/dp/B0BPX1DX87",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
