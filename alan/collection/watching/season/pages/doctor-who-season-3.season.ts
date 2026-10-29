import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason3 = {
  id: "01a06802-b8b9-7018-9247-197d66ede39a",
  type: "page-type/season",
  slug: "doctor-who-season-3",
  title: "Doctor Who Season 3",
  partOfCollections: ["show/doctor-who-2005"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-04-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60082",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
  progressedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Season
