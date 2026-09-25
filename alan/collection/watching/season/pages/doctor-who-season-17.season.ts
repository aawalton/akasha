import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason17 = {
  id: "01a06802-b8b9-700d-a1d3-5d8fa09350db",
  type: "page-type/season",
  slug: "doctor-who-season-17",
  title: "Doctor Who Season 17",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 17,
  ownLength: 499.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1979-09-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-437",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/17",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
