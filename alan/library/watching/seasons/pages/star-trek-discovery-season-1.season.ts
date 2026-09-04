import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySeason1 = {
  id: "01a06802-b8bc-704d-9309-098f090a6d43",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-season-1",
  title: "Star Trek: Discovery Season 1",
  partOfSlugs: ["star-trek-discovery"],
  position: 1,
  ownLength: 676.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-09-24",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
