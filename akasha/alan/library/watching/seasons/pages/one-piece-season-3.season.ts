import type { Season } from "../season.page-type.ts"

export const onePieceSeason3 = {
  id: "01a06802-b8bc-7000-aaff-49933be74204",
  pageTypeSlug: "season",
  slug: "one-piece-season-3",
  title: "One Piece Season 3",
  partOfSlugs: ["one-piece"],
  position: 3,
  ownLength: 336,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2001-08-26",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
