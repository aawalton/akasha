import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bookThreeChange = {
  id: "01a06802-b8b8-701a-92e5-f1556d2fab31",
  type: "page-type/season",
  slug: "book-three-change",
  title: "Book Three: Change",
  partOfCollections: ["show/the-legend-of-korra"],
  position: 3,
  ownLength: 298.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-06-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-45518",
      externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
