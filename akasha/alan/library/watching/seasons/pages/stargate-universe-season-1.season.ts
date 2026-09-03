import type { Season } from "../season.page-type.ts"

export const stargateUniverseSeason1 = {
  id: "01a06802-b8be-7007-a58d-24b13651fa05",
  pageTypeSlug: "season",
  slug: "stargate-universe-season-1",
  title: "Stargate Universe Season 1",
  partOfSlugs: ["stargate-universe"],
  position: 1,
  ownLength: 880.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-03",
  externalId: "trakt-season-15504",
  externalLink: "https://trakt.tv/shows/stargate-universe/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
