import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason122 = {
  id: "01a06802-b8b9-7009-a932-7380707adecf",
  type: "page-type/season",
  slug: "doctor-who-season-12-2",
  title: "Doctor Who Season 12",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 12,
  ownLength: 499.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1974-12-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-432",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/12",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
