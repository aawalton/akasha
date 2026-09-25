import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason4 = {
  id: "01a06802-b8b8-7028-aab2-b10a4c506fa1",
  type: "page-type/season",
  slug: "castle-season-4",
  title: "Castle Season 4",
  partOfCollections: ["show/castle"],
  position: 4,
  ownLength: 1011,
  ownProgress: 1011,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4092",
      externalLink: "https://trakt.tv/shows/castle/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
