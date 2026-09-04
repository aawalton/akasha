import type { Season } from "../season.page-type.ts"

export const starTrekVoyagerSeason3 = {
  id: "01a06802-b8bd-7023-b25e-ea8ee85ce9e8",
  pageTypeSlug: "season",
  slug: "star-trek-voyager-season-3",
  title: "Star Trek: Voyager Season 3",
  partOfSlugs: ["star-trek-voyager"],
  position: 3,
  ownLength: 1195.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1996-09-05",
  externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
