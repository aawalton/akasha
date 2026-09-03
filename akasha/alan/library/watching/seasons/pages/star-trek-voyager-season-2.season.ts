import type { Season } from "../season.page-type.ts"

export const starTrekVoyagerSeason2 = {
  id: "01a06802-b8bd-7022-9a39-274dcac57113",
  pageTypeSlug: "season",
  slug: "star-trek-voyager-season-2",
  title: "Star Trek: Voyager Season 2",
  partOfSlugs: ["star-trek-voyager"],
  position: 2,
  ownLength: 1195.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1995-08-29",
  externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
