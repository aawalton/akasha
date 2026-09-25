import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason25 = {
  id: "01a06802-b8b9-7016-b74a-dca6934984e7",
  type: "page-type/season",
  slug: "doctor-who-season-25",
  title: "Doctor Who Season 25",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 25,
  ownLength: 349.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1988-10-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-445",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/25",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
