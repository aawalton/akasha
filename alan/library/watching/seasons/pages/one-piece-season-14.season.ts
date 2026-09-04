import type { Season } from "../season.page-type.ts"

export const onePieceSeason14 = {
  id: "01a06802-b8bb-7048-95d8-6362ca3984d8",
  pageTypeSlug: "season",
  slug: "one-piece-season-14",
  title: "One Piece Season 14",
  partOfSlugs: ["one-piece"],
  position: 14,
  ownLength: 1392,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-11-13",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/14",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
