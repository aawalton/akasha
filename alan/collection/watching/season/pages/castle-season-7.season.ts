import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason7 = {
  id: "01a06802-b8b8-702b-be55-af7dcc206403",
  type: "page-type/season",
  slug: "castle-season-7",
  title: "Castle Season 7",
  partOfCollections: ["show/castle"],
  position: 7,
  ownLength: 1006.8,
  ownProgress: 1006.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4095",
      externalLink: "https://trakt.tv/shows/castle/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
