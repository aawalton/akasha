import type { Season } from "../season.page-type.types.ts"

export const onePieceSeason16 = {
  id: "01a06802-b8bb-704a-8826-b5a2ec53d60b",
  pageTypeSlug: "season",
  type: "season",
  slug: "one-piece-season-16",
  title: "One Piece Season 16",
  partOfCollections: ["one-piece"],
  position: 16,
  ownLength: 1200,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2014-05-04",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/16",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
