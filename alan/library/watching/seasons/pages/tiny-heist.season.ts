import type { Season } from "../season.page-type.ts"

export const tinyHeist = {
  id: "01a06802-b8c0-7005-b84d-7c6830308a02",
  pageTypeSlug: "season",
  slug: "tiny-heist",
  title: "Tiny Heist",
  partOfSlugs: ["dimension-20"],
  position: 4,
  ownLength: 750,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-01-10",
  externalId: "trakt-season-208557",
  externalLink: "https://trakt.tv/shows/dimension-20/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
