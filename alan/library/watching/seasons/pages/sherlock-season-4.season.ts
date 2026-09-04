import type { Season } from "../season.page-type.ts"

export const sherlockSeason4 = {
  id: "01a06802-b8bc-703c-a933-dbed21649ee2",
  pageTypeSlug: "season",
  slug: "sherlock-season-4",
  title: "Sherlock Season 4",
  partOfSlugs: ["sherlock"],
  position: 4,
  ownLength: 267,
  ownProgress: 267,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-01-01",
  externalId: "trakt-season-132852",
  externalLink: "https://trakt.tv/shows/sherlock/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
