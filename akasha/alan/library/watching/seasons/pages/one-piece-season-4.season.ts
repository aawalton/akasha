import type { Season } from "../season.page-type.ts"

export const onePieceSeason4 = {
  id: "01a06802-b8bc-7001-b57b-3029d0cbb520",
  pageTypeSlug: "season",
  slug: "one-piece-season-4",
  title: "One Piece Season 4",
  partOfSlugs: ["one-piece"],
  position: 4,
  ownLength: 936,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2001-12-09",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
