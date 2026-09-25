import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason5 = {
  id: "01a06802-b8b8-7029-9895-5ee54116c643",
  type: "page-type/season",
  slug: "castle-season-5",
  title: "Castle Season 5",
  partOfCollections: ["show/castle"],
  position: 5,
  ownLength: 1051.2,
  ownProgress: 1051.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4093",
      externalLink: "https://trakt.tv/shows/castle/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
