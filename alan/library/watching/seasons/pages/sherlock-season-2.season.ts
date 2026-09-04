import type { Season } from "../season.page-type.ts"

export const sherlockSeason2 = {
  id: "01a06802-b8bc-703a-a41e-7fe1eeaee41c",
  pageTypeSlug: "season",
  slug: "sherlock-season-2",
  title: "Sherlock Season 2",
  partOfSlugs: ["sherlock"],
  position: 2,
  ownLength: 268.2,
  ownProgress: 268.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2012-01-01",
  externalId: "trakt-season-30836",
  externalLink: "https://trakt.tv/shows/sherlock/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
