import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const swordArtOnlineProgressive = {
  id: "019db533-f38b-76dc-adcf-1d80a797ea3d",
  type: "page-type/book-series",
  slug: "sword-art-online-progressive",
  title: "Sword Art Online Progressive",
  status: "completed",
  grade: "A",
  unit: "unit/words",
  maturityRating: "PG-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083757RNN",
      externalLink: "https://www.amazon.com/dp/B083757RNN",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
