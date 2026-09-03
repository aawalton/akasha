import type { Season } from "../season.page-type.ts"

export const castleSeason5 = {
  id: "01a06802-b8b8-7029-9895-5ee54116c643",
  pageTypeSlug: "season",
  slug: "castle-season-5",
  title: "Castle Season 5",
  partOfSlugs: ["castle"],
  position: 5,
  ownLength: 1051.2,
  ownProgress: 1051.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2012-09-25",
  externalId: "trakt-season-4093",
  externalLink: "https://trakt.tv/shows/castle/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
