import type { Season } from "../season.page-type.ts"

export const starWarsTheBadBatchSeason3 = {
  id: "01a06802-b8bd-703b-991b-0afca3f525e3",
  pageTypeSlug: "season",
  slug: "star-wars-the-bad-batch-season-3",
  title: "Star Wars: The Bad Batch Season 3",
  partOfSlugs: ["star-wars-the-bad-batch"],
  position: 3,
  ownLength: 423,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-02-21",
  externalId: "trakt-season-320716",
  externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
