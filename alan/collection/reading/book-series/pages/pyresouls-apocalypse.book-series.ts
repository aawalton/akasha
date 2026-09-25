import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const pyresoulsApocalypse = {
  id: "019db533-f38b-77a3-8af8-fdba43f52dac",
  type: "page-type/book-series",
  slug: "pyresouls-apocalypse",
  title: "Pyresouls Apocalypse",
  status: "following",
  grade: "B",
  unit: "unit/words",
  maturityRating: "R",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08GPPNPCG",
      externalLink: "https://www.amazon.com/dp/B08GPPNPCG",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
