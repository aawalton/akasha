import type { Season } from "../season.page-type.ts"

export const starTrekVoyagerSeason4 = {
  id: "01a06802-b8bd-7024-855c-53b5c2341f42",
  pageTypeSlug: "season",
  slug: "star-trek-voyager-season-4",
  title: "Star Trek: Voyager Season 4",
  partOfSlugs: ["star-trek-voyager"],
  position: 4,
  ownLength: 1194,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1997-09-04",
  externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
