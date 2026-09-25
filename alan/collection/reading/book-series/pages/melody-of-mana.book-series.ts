import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const melodyOfMana = {
  id: "019db533-f38b-7802-b7cb-9ea8155205ca",
  type: "page-type/book-series",
  slug: "melody-of-mana",
  title: "Melody of Mana",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4X17PLH",
      externalLink: "https://www.amazon.com/dp/B0B4X17PLH",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
