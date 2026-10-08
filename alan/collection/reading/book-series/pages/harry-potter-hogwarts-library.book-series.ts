import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const harryPotterHogwartsLibrary = {
  id: "019db533-f38b-7558-ad45-8d9a8c21ba45",
  type: "page-type/book-series",
  slug: "harry-potter-hogwarts-library",
  title: "Harry Potter: Hogwarts Library",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09DCNLCJJ",
      externalLink:
        "https://www.amazon.com/Harry-Potter-Hogwarts-Library-3-book-series/dp/B09DCNLCJJ",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
