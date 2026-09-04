import type { Season } from "../season.page-type.ts"

export const strangerThings4 = {
  id: "01a06802-b8be-7012-b52c-e1f85e1859d3",
  pageTypeSlug: "season",
  slug: "stranger-things-4",
  title: "Stranger Things 4",
  partOfSlugs: ["stranger-things"],
  position: 4,
  ownLength: 778.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-05-27",
  externalId: "trakt-season-203269",
  externalLink: "https://trakt.tv/shows/stranger-things/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
