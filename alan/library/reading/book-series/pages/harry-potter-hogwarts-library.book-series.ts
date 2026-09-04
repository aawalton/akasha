import type { BookSeries } from "../book-series.page-type.ts"

export const harryPotterHogwartsLibrary = {
  id: "019db533-f38b-7558-ad45-8d9a8c21ba45",
  pageTypeSlug: "book-series",
  slug: "harry-potter-hogwarts-library",
  title: "Harry Potter: Hogwarts Library",
  status: "not-started",
  unitSlug: "words",
  position: 3,
  source: "kindle",
  externalId: "B09DCNLCJJ",
  externalLink: "https://www.amazon.com/Harry-Potter-Hogwarts-Library-3-book-series/dp/B09DCNLCJJ",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
