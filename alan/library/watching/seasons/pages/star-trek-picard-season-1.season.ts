import type { Season } from "../season.page-type.ts"

export const starTrekPicardSeason1 = {
  id: "01a06802-b8bd-7009-a860-2a323e18d120",
  pageTypeSlug: "season",
  slug: "star-trek-picard-season-1",
  title: "Star Trek: Picard Season 1",
  partOfSlugs: ["star-trek-picard"],
  position: 1,
  ownLength: 495,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-01-23",
  externalLink: "https://trakt.tv/shows/star-trek-picard/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
