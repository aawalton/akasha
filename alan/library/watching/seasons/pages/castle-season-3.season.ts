import type { Season } from "../season.page-type.ts"

export const castleSeason3 = {
  id: "01a06802-b8b8-7027-b4dd-6f92a8a3df23",
  pageTypeSlug: "season",
  slug: "castle-season-3",
  title: "Castle Season 3",
  partOfSlugs: ["castle"],
  position: 3,
  ownLength: 1051.8,
  ownProgress: 1051.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2010-09-21",
  externalId: "trakt-season-4091",
  externalLink: "https://trakt.tv/shows/castle/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
