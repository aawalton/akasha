import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bookTwoSpirits = {
  id: "01a06802-b8b8-701d-8e34-5697eb745b89",
  type: "page-type/season",
  slug: "book-two-spirits",
  title: "Book Two: Spirits",
  partOfCollections: ["show/the-legend-of-korra"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45517",
      externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Season
