import type { Season } from "../season.page-type.ts"

export const sherlockSeason1 = {
  id: "01a06802-b8bc-7039-b43f-4a493333f962",
  pageTypeSlug: "season",
  slug: "sherlock-season-1",
  title: "Sherlock Season 1",
  partOfSlugs: ["sherlock"],
  position: 1,
  ownLength: 267,
  ownProgress: 267,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2010-07-25",
  externalId: "trakt-season-30835",
  externalLink: "https://trakt.tv/shows/sherlock/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
