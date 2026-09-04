import type { Season } from "../season.page-type.ts"

export const onePieceSeason15 = {
  id: "01a06802-b8bb-7049-a28c-cac0417818c9",
  pageTypeSlug: "season",
  slug: "one-piece-season-15",
  title: "One Piece Season 15",
  partOfSlugs: ["one-piece"],
  position: 15,
  ownLength: 1488,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-01-20",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/15",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
