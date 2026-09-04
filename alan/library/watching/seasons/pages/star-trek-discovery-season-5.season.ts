import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySeason5 = {
  id: "01a06802-b8bc-7051-a684-bd6992f50ef6",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-season-5",
  title: "Star Trek: Discovery Season 5",
  partOfSlugs: ["star-trek-discovery"],
  position: 5,
  ownLength: 580.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-04-04",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
