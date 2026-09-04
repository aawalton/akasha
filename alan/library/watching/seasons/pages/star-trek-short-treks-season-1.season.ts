import type { Season } from "../season.page-type.ts"

export const starTrekShortTreksSeason1 = {
  id: "01a06802-b8bd-7012-9264-9b07f7497286",
  pageTypeSlug: "season",
  slug: "star-trek-short-treks-season-1",
  title: "Star Trek: Short Treks Season 1",
  partOfSlugs: ["star-trek-short-treks"],
  position: 1,
  ownLength: 63,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-03",
  externalLink: "https://trakt.tv/shows/star-trek-short-treks/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
