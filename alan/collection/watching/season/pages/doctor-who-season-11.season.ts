import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason11 = {
  id: "01a06802-b8b9-7006-aff9-27a4f02d02f9",
  type: "page-type/season",
  slug: "doctor-who-season-11",
  title: "Doctor Who Season 11",
  partOfCollections: ["show/doctor-who-2005"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "paused",
  publishedAt: "2018-10-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-171300",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/11",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:29:29.394Z",
} as const satisfies Season
