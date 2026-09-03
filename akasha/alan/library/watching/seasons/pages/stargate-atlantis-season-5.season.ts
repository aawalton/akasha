import type { Season } from "../season.page-type.ts"

export const stargateAtlantisSeason5 = {
  id: "01a06802-b8bd-7048-9550-e78efd8d98f4",
  pageTypeSlug: "season",
  slug: "stargate-atlantis-season-5",
  title: "Stargate Atlantis Season 5",
  partOfSlugs: ["stargate-atlantis"],
  position: 5,
  ownLength: 877.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-07-11",
  externalId: "trakt-season-7514",
  externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
