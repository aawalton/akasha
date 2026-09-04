import type { Season } from "../season.page-type.ts"

export const arcaneSeason1 = {
  id: "01a06802-b8b7-700f-bd4c-77e64faeb78d",
  pageTypeSlug: "season",
  slug: "arcane-season-1",
  title: "Arcane Season 1",
  partOfSlugs: ["arcane"],
  position: 1,
  ownLength: 379.2,
  ownProgress: 379.2,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2021-11-06",
  externalLink: "https://trakt.tv/shows/arcane/seasons/1",
  lastSyncedAt: "2025-10-04",
} as const satisfies Season
