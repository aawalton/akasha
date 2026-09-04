import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySeason2 = {
  id: "01a06802-b8bc-704e-8394-d45a66c7d511",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-season-2",
  title: "Star Trek: Discovery Season 2",
  partOfSlugs: ["star-trek-discovery"],
  position: 2,
  ownLength: 714,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-01-17",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
