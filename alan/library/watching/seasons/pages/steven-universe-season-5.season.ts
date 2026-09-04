import type { Season } from "../season.page-type.ts"

export const stevenUniverseSeason5 = {
  id: "01a06802-b8be-700e-91bd-b0db492e5e2c",
  pageTypeSlug: "season",
  slug: "steven-universe-season-5",
  title: "Steven Universe Season 5",
  partOfSlugs: ["steven-universe"],
  position: 5,
  ownLength: 381,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-05-29",
  externalId: "trakt-season-143873",
  externalLink: "https://trakt.tv/shows/steven-universe/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
