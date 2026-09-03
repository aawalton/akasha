import type { Season } from "../season.page-type.ts"

export const lokiSeason1 = {
  id: "01a06802-b8ba-7030-a647-78aecbc366b5",
  pageTypeSlug: "season",
  slug: "loki-season-1",
  title: "Loki Season 1",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 30,
  ownLength: 301.8,
  ownProgress: 301.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-06-10",
  externalLink: "https://trakt.tv/shows/loki/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
