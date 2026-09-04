import type { Season } from "../season.page-type.ts"

export const castleSeason7 = {
  id: "01a06802-b8b8-702b-be55-af7dcc206403",
  pageTypeSlug: "season",
  slug: "castle-season-7",
  title: "Castle Season 7",
  partOfSlugs: ["castle"],
  position: 7,
  ownLength: 1006.8,
  ownProgress: 1006.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-09-30",
  externalId: "trakt-season-4095",
  externalLink: "https://trakt.tv/shows/castle/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
