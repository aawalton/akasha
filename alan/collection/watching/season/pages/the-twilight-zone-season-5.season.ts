import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason5 = {
  id: "01a06802-b8bf-7048-ae1f-df3cca6a1c8f",
  type: "page-type/season",
  slug: "the-twilight-zone-season-5",
  title: "The Twilight Zone Season 5",
  partOfCollections: ["show/the-twilight-zone-1959"],
  position: 5,
  ownLength: 936,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1963-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-1959/seasons/5",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Season
