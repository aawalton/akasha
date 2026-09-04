import type { Season } from "../season.page-type.ts"

export const onePieceSeason6 = {
  id: "01a06802-b8bc-7003-bc2b-7aba3c00d1aa",
  pageTypeSlug: "season",
  slug: "one-piece-season-6",
  title: "One Piece Season 6",
  partOfSlugs: ["one-piece"],
  position: 6,
  ownLength: 1248,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-02-09",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
