import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason23 = {
  id: "01a06802-b8bf-7044-897d-ed101f3a5124",
  type: "page-type/season",
  slug: "the-twilight-zone-season-2-3",
  title: "The Twilight Zone Season 2",
  partOfCollections: ["show/the-twilight-zone-1959"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1960-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-1959/seasons/2",
      lastSyncedAt: "2025-10-30",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:33.325Z",
} as const satisfies Season
