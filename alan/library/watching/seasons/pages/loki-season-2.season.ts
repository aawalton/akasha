import type { Season } from "../season.page-type.ts"

export const lokiSeason2 = {
  id: "01a06802-b8ba-7031-89e0-ec5a31ef2508",
  pageTypeSlug: "season",
  slug: "loki-season-2",
  title: "Loki Season 2",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 44,
  ownLength: 313.2,
  ownProgress: 313.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2023-10-06",
  externalLink: "https://trakt.tv/shows/loki/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
