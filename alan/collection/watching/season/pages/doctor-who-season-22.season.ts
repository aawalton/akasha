import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason22 = {
  id: "01a06802-b8b9-7014-8d05-f476186b77ae",
  type: "page-type/season",
  slug: "doctor-who-season-22",
  title: "Doctor Who Season 22",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 22,
  ownLength: 598.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1985-01-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-442",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/22",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
