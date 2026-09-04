import type { Season } from "../season.page-type.ts"

export const starTrekVoyagerSeason5 = {
  id: "01a06802-b8bd-7025-8535-2879131832f8",
  pageTypeSlug: "season",
  slug: "star-trek-voyager-season-5",
  title: "Star Trek: Voyager Season 5",
  partOfSlugs: ["star-trek-voyager"],
  position: 5,
  ownLength: 1237.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-10-15",
  externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
