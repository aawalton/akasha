import type { Season } from "../season.page-type.ts"

export const strangerThings3 = {
  id: "01a06802-b8be-7011-ba5e-1a954b47039b",
  pageTypeSlug: "season",
  slug: "stranger-things-3",
  title: "Stranger Things 3",
  partOfSlugs: ["stranger-things"],
  position: 3,
  ownLength: 451.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-07-04",
  externalId: "trakt-season-164416",
  externalLink: "https://trakt.tv/shows/stranger-things/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
