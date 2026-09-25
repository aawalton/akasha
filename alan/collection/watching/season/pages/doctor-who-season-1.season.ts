import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason1 = {
  id: "01a06802-b8b9-7002-b5cb-08af6e0ac10f",
  type: "page-type/season",
  slug: "doctor-who-season-1",
  title: "Doctor Who Season 1",
  partOfCollections: ["show/doctor-who-2005"],
  position: 1,
  ownLength: 583.8,
  ownProgress: 583.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-03-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60080",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
