import type { Season } from "../season.page-type.ts"

export const arcaneSeason2 = {
  id: "01a06802-b8b7-7010-8f3e-4870890f4f87",
  pageTypeSlug: "season",
  slug: "arcane-season-2",
  title: "Arcane Season 2",
  partOfSlugs: ["arcane"],
  position: 2,
  ownLength: 379.2,
  ownProgress: 379.2,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2024-11-09",
  externalLink: "https://trakt.tv/shows/arcane/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
