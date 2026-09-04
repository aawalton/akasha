import type { Season } from "../season.page-type.ts"

export const crusadeSeason1 = {
  id: "01a06802-b8b8-7045-bac0-da04c7c40141",
  pageTypeSlug: "season",
  slug: "crusade-season-1",
  title: "Crusade Season 1",
  partOfSlugs: ["crusade"],
  position: 1,
  ownLength: 572,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1999-06-10",
  externalId: "1",
  externalLink: "https://trakt.tv/shows/crusade/seasons/1",
  lastSyncedAt: "2025-12-20",
} as const satisfies Season
