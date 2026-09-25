import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason4 = {
  id: "01a06802-b8b9-701a-a84a-870282c6c649",
  type: "page-type/season",
  slug: "doctor-who-season-4",
  title: "Doctor Who Season 4",
  partOfCollections: ["show/doctor-who-2005"],
  position: 4,
  ownLength: 642,
  ownProgress: 642,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-04-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60083",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
