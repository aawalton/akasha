import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTwilightZoneSeason1 = {
  id: "01a06802-b8bf-703e-b994-06095afaa073",
  type: "page-type/season",
  slug: "the-twilight-zone-season-1",
  title: "The Twilight Zone Season 1",
  partOfCollections: ["show/the-twilight-zone-2002"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-2002/seasons/1",
      lastSyncedAt: "2025-10-30",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:47:51.887Z",
} as const satisfies Season
