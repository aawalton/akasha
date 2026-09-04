import type { Season } from "../season.page-type.ts"

export const campaign4 = {
  id: "01a06802-b8b8-7022-b871-d10ce8fc5003",
  pageTypeSlug: "season",
  slug: "campaign-4",
  title: "Campaign 4",
  partOfSlugs: ["critical-role"],
  position: 4,
  ownLength: 960,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-10-03",
  externalId: "trakt-season-477848",
  externalLink: "https://trakt.tv/shows/critical-role/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
