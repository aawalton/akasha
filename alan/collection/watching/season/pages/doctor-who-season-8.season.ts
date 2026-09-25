import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason8 = {
  id: "01a06802-b8b9-7022-aeab-23478951b5c7",
  type: "page-type/season",
  slug: "doctor-who-season-8",
  title: "Doctor Who Season 8",
  partOfCollections: ["show/doctor-who-2005"],
  position: 8,
  ownLength: 592.2,
  ownProgress: 592.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-08-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60087",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
