import type { Season } from "../season.page-type.ts"

export const castleSeason2 = {
  id: "01a06802-b8b8-7026-8291-0457a87a3c7a",
  pageTypeSlug: "season",
  slug: "castle-season-2",
  title: "Castle Season 2",
  partOfSlugs: ["castle"],
  position: 2,
  ownLength: 1048.2,
  ownProgress: 1048.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2009-09-22",
  externalId: "trakt-season-4090",
  externalLink: "https://trakt.tv/shows/castle/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
