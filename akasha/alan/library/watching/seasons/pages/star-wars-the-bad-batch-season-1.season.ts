import type { Season } from "../season.page-type.ts"

export const starWarsTheBadBatchSeason1 = {
  id: "01a06802-b8bd-7039-8305-f73a07686442",
  pageTypeSlug: "season",
  slug: "star-wars-the-bad-batch-season-1",
  title: "Star Wars: The Bad Batch Season 1",
  partOfSlugs: ["star-wars-the-bad-batch"],
  position: 1,
  ownLength: 511.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-05-04",
  externalId: "trakt-season-245620",
  externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
