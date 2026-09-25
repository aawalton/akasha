import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason32 = {
  id: "01a06802-b8b9-7019-899c-1812fe31273a",
  type: "page-type/season",
  slug: "doctor-who-season-3-2",
  title: "Doctor Who Season 3",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 3,
  ownLength: 1110,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1965-09-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-423",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
