import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const fantasticBeasts = {
  id: "019db533-f38b-7547-9506-b0b14f4f9b67",
  type: "page-type/book-series",
  slug: "fantastic-beasts",
  title: "Fantastic Beasts",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09D7RDCHY",
      externalLink: "https://www.amazon.com/Fantastic-Beasts-3-book-series/dp/B09D7RDCHY",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
