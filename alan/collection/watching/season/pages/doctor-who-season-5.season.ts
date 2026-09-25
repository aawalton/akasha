import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason5 = {
  id: "01a06802-b8b9-701c-be37-e3f2b10b8f20",
  type: "page-type/season",
  slug: "doctor-who-season-5",
  title: "Doctor Who Season 5",
  partOfCollections: ["show/doctor-who-2005"],
  position: 5,
  ownLength: 610.8,
  ownProgress: 610.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-04-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60084",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
