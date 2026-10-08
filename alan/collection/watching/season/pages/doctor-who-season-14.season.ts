import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason14 = {
  id: "01a06802-b8b9-700b-811e-f867e9c3ba34",
  type: "page-type/season",
  slug: "doctor-who-season-14",
  title: "Doctor Who Season 14",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 14,
  ownLength: 649.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1976-09-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-434",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/14",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
