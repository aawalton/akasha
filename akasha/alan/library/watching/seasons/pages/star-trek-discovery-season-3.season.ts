import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySeason3 = {
  id: "01a06802-b8bc-704f-831b-27238859004d",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-season-3",
  title: "Star Trek: Discovery Season 3",
  partOfSlugs: ["star-trek-discovery"],
  position: 3,
  ownLength: 670.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-10-15",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
