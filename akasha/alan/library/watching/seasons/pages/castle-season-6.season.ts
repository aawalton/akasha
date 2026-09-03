import type { Season } from "../season.page-type.ts"

export const castleSeason6 = {
  id: "01a06802-b8b8-702a-bc07-ef9fc0ddbf90",
  pageTypeSlug: "season",
  slug: "castle-season-6",
  title: "Castle Season 6",
  partOfSlugs: ["castle"],
  position: 6,
  ownLength: 1011,
  ownProgress: 1011,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-09-24",
  externalId: "trakt-season-4094",
  externalLink: "https://trakt.tv/shows/castle/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
