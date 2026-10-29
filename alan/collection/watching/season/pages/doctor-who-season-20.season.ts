import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason20 = {
  id: "01a06802-b8b9-7012-b835-0d1da285e1da",
  type: "page-type/season",
  slug: "doctor-who-season-20",
  title: "Doctor Who Season 20",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1983-01-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-440",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/20",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:28:51.952Z",
} as const satisfies Season
