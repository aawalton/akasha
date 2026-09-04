import type { Season } from "../season.page-type.ts"

export const onePieceSeason11 = {
  id: "01a06802-b8bb-7045-abd4-81e00b2acefd",
  pageTypeSlug: "season",
  slug: "one-piece-season-11",
  title: "One Piece Season 11",
  partOfSlugs: ["one-piece"],
  position: 11,
  ownLength: 624,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-12-21",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/11",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
