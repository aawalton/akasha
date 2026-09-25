import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bornInTheApocalypse = {
  id: "019db533-f38b-78c0-9511-43efe9a4bb8c",
  type: "page-type/book-series",
  slug: "born-in-the-apocalypse",
  title: "Born in the Apocalypse",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075VHSR7V",
      externalLink: "https://www.amazon.com/dp/B075VHSR7V",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
