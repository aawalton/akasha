import type { Season } from "../season.page-type.ts"

export const onePieceSeason5 = {
  id: "01a06802-b8bc-7002-a770-fbe15f7fd494",
  pageTypeSlug: "season",
  slug: "one-piece-season-5",
  title: "One Piece Season 5",
  partOfSlugs: ["one-piece"],
  position: 5,
  ownLength: 312,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2002-11-03",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
