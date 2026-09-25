import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason92 = {
  id: "01a06802-b8b9-7025-8083-593f807190f0",
  type: "page-type/season",
  slug: "doctor-who-season-9-2",
  title: "Doctor Who Season 9",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 9,
  ownLength: 649.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1972-01-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-429",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
