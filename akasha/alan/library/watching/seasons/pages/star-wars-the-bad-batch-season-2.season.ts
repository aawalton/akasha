import type { Season } from "../season.page-type.ts"

export const starWarsTheBadBatchSeason2 = {
  id: "01a06802-b8bd-703a-9ecd-aea21ba79dfd",
  pageTypeSlug: "season",
  slug: "star-wars-the-bad-batch-season-2",
  title: "Star Wars: The Bad Batch Season 2",
  partOfSlugs: ["star-wars-the-bad-batch"],
  position: 2,
  ownLength: 462,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-01-04",
  externalId: "trakt-season-295695",
  externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
