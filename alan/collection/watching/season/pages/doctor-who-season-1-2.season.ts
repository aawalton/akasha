import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason12 = {
  id: "01a06802-b8b9-7003-a373-66eb0b01b688",
  type: "page-type/season",
  slug: "doctor-who-season-1-2",
  title: "Doctor Who Season 1",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 1,
  ownLength: 1026,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1963-11-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-421",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
