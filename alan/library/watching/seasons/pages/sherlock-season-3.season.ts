import type { Season } from "../season.page-type.ts"

export const sherlockSeason3 = {
  id: "01a06802-b8bc-703b-ab02-6f4e5561c557",
  pageTypeSlug: "season",
  type: "season",
  slug: "sherlock-season-3",
  title: "Sherlock Season 3",
  partOfCollections: ["sherlock"],
  position: 3,
  ownLength: 264,
  ownProgress: 264,
  unit: "minutes",
  status: "completed",
  publishedAt: "2014-01-01",
  externalId: "trakt-season-30837",
  externalLink: "https://trakt.tv/shows/sherlock/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
