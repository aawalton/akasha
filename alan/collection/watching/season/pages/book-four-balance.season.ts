import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bookFourBalance = {
  id: "01a06802-b8b8-7017-bf93-20549fd44a85",
  type: "page-type/season",
  slug: "book-four-balance",
  title: "Book Four: Balance",
  partOfCollections: ["show/the-legend-of-korra"],
  position: 4,
  ownLength: 298.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-91246",
      externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
