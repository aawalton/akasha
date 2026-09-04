import type { Season } from "../season.page-type.ts"

export const onePieceSeason18 = {
  id: "01a06802-b8bb-704c-b215-e0ee8c10c30b",
  pageTypeSlug: "season",
  slug: "one-piece-season-18",
  title: "One Piece Season 18",
  partOfSlugs: ["one-piece"],
  position: 18,
  ownLength: 1320,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-07-09",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/18",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
