import type { Season } from "../season.page-type.ts"

export const starTrekPicardSeason2 = {
  id: "01a06802-b8bd-700a-a924-837f92350d4b",
  pageTypeSlug: "season",
  slug: "star-trek-picard-season-2",
  title: "Star Trek: Picard Season 2",
  partOfSlugs: ["star-trek-picard"],
  position: 2,
  ownLength: 481.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-03-03",
  externalLink: "https://trakt.tv/shows/star-trek-picard/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
