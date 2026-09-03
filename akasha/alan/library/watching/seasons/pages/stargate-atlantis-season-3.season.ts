import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSeason3 = {
  id: "01a06802-b8bd-7046-a499-0fe3b3da7fda",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-season-3",
  title: "Stargate Atlantis Season 3",
  partOfSlugs: ["stargate-atlantis"],
  position: 3,
  ownLength: 850.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-07-14",
  externalId: "trakt-season-7512",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
