import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason10 = {
  id: "01a06802-b8b9-7004-b8ec-d1899a4fd811",
  type: "page-type/season",
  slug: "doctor-who-season-10",
  title: "Doctor Who Season 10",
  partOfCollections: ["show/doctor-who-2005"],
  position: 10,
  ownLength: 564,
  ownProgress: 564,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-04-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-119822",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
