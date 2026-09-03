import type { Season } from "../season.page-type.ts"

export const strangerThings2 = {
  id: "01a06802-b8be-7010-8df7-1e5f51ff3354",
  pageTypeSlug: "season",
  slug: "stranger-things-2",
  title: "Stranger Things 2",
  partOfSlugs: ["stranger-things"],
  position: 2,
  ownLength: 466.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-10-27",
  externalId: "trakt-season-131692",
  externalLink: "https://trakt.tv/shows/stranger-things/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
