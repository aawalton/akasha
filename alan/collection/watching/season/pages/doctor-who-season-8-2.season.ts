import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason82 = {
  id: "01a06802-b8b9-7023-b516-8db112b74487",
  type: "page-type/season",
  slug: "doctor-who-season-8-2",
  title: "Doctor Who Season 8",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 8,
  ownLength: 625.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1971-01-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-428",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
