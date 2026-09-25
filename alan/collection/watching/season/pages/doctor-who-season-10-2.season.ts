import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSeason102 = {
  id: "01a06802-b8b9-7005-83a1-762e0c4f4097",
  type: "page-type/season",
  slug: "doctor-who-season-10-2",
  title: "Doctor Who Season 10",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 10,
  ownLength: 649.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1972-12-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-430",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
