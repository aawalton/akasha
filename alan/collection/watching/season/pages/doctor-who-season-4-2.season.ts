import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason42 = {
  id: "01a06802-b8b9-701b-9829-14257090168a",
  type: "page-type/season",
  slug: "doctor-who-season-4-2",
  title: "Doctor Who Season 4",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 4,
  ownLength: 1069.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1966-09-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-424",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
