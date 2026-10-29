import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason13 = {
  id: "01a06802-b8b9-700a-9c9e-4b068889ff39",
  type: "page-type/season",
  slug: "doctor-who-season-13",
  title: "Doctor Who Season 13",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1975-08-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-433",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/13",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:28:51.952Z",
} as const satisfies Season
