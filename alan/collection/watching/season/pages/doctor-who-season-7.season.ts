import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason7 = {
  id: "01a06802-b8b9-7020-bcc8-cbdb244dfca0",
  type: "page-type/season",
  slug: "doctor-who-season-7",
  title: "Doctor Who Season 7",
  partOfCollections: ["show/doctor-who-2005"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-09-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60086",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
  progressedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Season
