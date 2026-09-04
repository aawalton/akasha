import type { Season } from "../season.page-type.ts"

export const starTrekPicardSeason3 = {
  id: "01a06802-b8bd-700b-9da3-2fafa89fc728",
  pageTypeSlug: "season",
  slug: "star-trek-picard-season-3",
  title: "Star Trek: Picard Season 3",
  partOfSlugs: ["star-trek-picard"],
  position: 3,
  ownLength: 537,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-02-16",
  externalLink: "https://trakt.tv/shows/star-trek-picard/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
