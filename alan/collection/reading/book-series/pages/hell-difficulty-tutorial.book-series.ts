import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const hellDifficultyTutorial = {
  id: "019db533-f38b-7823-8b86-6df940f1b4d3",
  type: "page-type/book-series",
  slug: "hell-difficulty-tutorial",
  title: "Hell Difficulty Tutorial",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CRT37F6S",
      externalLink: "https://www.amazon.com/dp/B0CRT37F6S",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
