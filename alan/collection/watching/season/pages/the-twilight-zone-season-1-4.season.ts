import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason14 = {
  id: "01a06802-b8bf-7041-a54e-42fb9725b6eb",
  type: "page-type/season",
  slug: "the-twilight-zone-season-1-4",
  title: "The Twilight Zone Season 1",
  partOfCollections: ["show/the-twilight-zone-1959"],
  position: 1,
  ownLength: 936,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1959-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-1959/seasons/1",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
