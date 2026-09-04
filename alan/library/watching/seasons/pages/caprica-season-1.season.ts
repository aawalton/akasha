import type { Season } from "../season.page-type.ts"

export const capricaSeason1 = {
  id: "01a06802-b8b8-7023-9131-c1d659071485",
  pageTypeSlug: "season",
  slug: "caprica-season-1",
  title: "Caprica Season 1",
  partOfSlugs: ["caprica"],
  position: 1,
  ownLength: 787.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-01-23",
  externalId: "trakt-season-2811",
  externalLink: "https://trakt.tv/shows/caprica/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
