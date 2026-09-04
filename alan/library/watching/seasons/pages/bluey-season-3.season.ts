import type { Season } from "../season.page-type.ts"

export const blueySeason3 = {
  id: "01a06802-b8b8-700d-9331-ba694dce0892",
  pageTypeSlug: "season",
  slug: "bluey-season-3",
  title: "Bluey Season 3",
  partOfSlugs: ["bluey"],
  position: 3,
  ownLength: 346.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-09-04",
  externalId: "trakt-season-270796",
  externalLink: "https://trakt.tv/shows/bluey-2018/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
