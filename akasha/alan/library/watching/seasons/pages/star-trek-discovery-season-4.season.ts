import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySeason4 = {
  id: "01a06802-b8bc-7050-8977-b3d2186a102d",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-season-4",
  title: "Star Trek: Discovery Season 4",
  partOfSlugs: ["star-trek-discovery"],
  position: 4,
  ownLength: 658.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-11-18",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
