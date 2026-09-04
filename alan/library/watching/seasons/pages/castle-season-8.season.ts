import type { Season } from "../season.page-type.ts"

export const castleSeason8 = {
  id: "01a06802-b8b8-702c-a942-36faefd16b2a",
  pageTypeSlug: "season",
  slug: "castle-season-8",
  title: "Castle Season 8",
  partOfSlugs: ["castle"],
  position: 8,
  ownLength: 966,
  ownProgress: 966,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-09-22",
  externalId: "trakt-season-112189",
  externalLink: "https://trakt.tv/shows/castle/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
