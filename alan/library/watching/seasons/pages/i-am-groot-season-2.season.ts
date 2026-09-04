import type { Season } from "../season.page-type.ts"

export const iAmGrootSeason2 = {
  id: "01a06802-b8ba-702a-a3a1-0cff11f78778",
  pageTypeSlug: "season",
  slug: "i-am-groot-season-2",
  title: "I Am Groot Season 2",
  partOfSlugs: ["i-am-groot"],
  position: 2,
  ownLength: 24,
  ownProgress: 24,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2023-09-06",
  externalId: "trakt-season-330590",
  externalLink: "https://trakt.tv/shows/i-am-groot/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
