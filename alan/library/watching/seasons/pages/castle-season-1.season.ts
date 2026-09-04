import type { Season } from "../season.page-type.ts"

export const castleSeason1 = {
  id: "01a06802-b8b8-7025-8c2f-79d3e3419549",
  pageTypeSlug: "season",
  slug: "castle-season-1",
  title: "Castle Season 1",
  partOfSlugs: ["castle"],
  position: 1,
  ownLength: 433.2,
  ownProgress: 433.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2009-03-10",
  externalId: "trakt-season-4089",
  externalLink: "https://trakt.tv/shows/castle/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
