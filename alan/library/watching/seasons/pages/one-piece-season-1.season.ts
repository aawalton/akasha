import type { Season } from "../season.page-type.types.ts"

export const onePieceSeason1 = {
  id: "01a06802-b8bb-7043-99c6-b7522af336a2",
  pageTypeSlug: "season",
  type: "season",
  slug: "one-piece-season-1",
  title: "One Piece Season 1",
  partOfCollections: ["one-piece"],
  position: 1,
  ownLength: 1513.8,
  ownProgress: 1513.8,
  unit: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "1999-10-20",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
