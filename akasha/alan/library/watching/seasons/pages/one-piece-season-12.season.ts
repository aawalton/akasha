import type { Season } from "../season.page-type.ts"

export const onePieceSeason12 = {
  id: "01a06802-b8bb-7046-ad64-659cafb3fa5d",
  pageTypeSlug: "season",
  slug: "one-piece-season-12",
  title: "One Piece Season 12",
  partOfSlugs: ["one-piece"],
  position: 12,
  ownLength: 336,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-07-05",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/12",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
