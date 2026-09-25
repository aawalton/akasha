import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theTrialOfATimeLord = {
  id: "01a06802-b8bf-703d-9983-5a68252d51bc",
  type: "page-type/season",
  slug: "the-trial-of-a-time-lord",
  title: "The Trial of a Time Lord",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 23,
  ownLength: 349.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1986-09-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-443",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/23",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
