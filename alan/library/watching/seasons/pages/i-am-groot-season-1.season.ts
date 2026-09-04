import type { Season } from "../season.page-type.ts"

export const iAmGrootSeason1 = {
  id: "01a06802-b8ba-7029-b8a6-906af599bfc8",
  pageTypeSlug: "season",
  slug: "i-am-groot-season-1",
  title: "I Am Groot Season 1",
  partOfSlugs: ["i-am-groot"],
  position: 1,
  ownLength: 28.2,
  ownProgress: 28.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-08-10",
  externalId: "trakt-season-330045",
  externalLink: "https://trakt.tv/shows/i-am-groot/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
