import type { Season } from "../season.page-type.ts"

export const studioCSeason3 = {
  id: "01a06802-b8be-7022-9d25-20fb8a70aa0c",
  pageTypeSlug: "season",
  slug: "studio-c-season-3",
  title: "Studio C Season 3",
  partOfSlugs: ["studio-c"],
  position: 3,
  ownLength: 445.8,
  ownProgress: 445.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-10-08",
  externalId: "trakt-season-80785",
  externalLink: "https://trakt.tv/shows/studio-c/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
