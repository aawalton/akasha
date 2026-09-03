import type { Season } from "../season.page-type.ts"

export const onePieceSeason7 = {
  id: "01a06802-b8bc-7004-9e8b-97e65b8d87ae",
  pageTypeSlug: "season",
  slug: "one-piece-season-7",
  title: "One Piece Season 7",
  partOfSlugs: ["one-piece"],
  position: 7,
  ownLength: 792,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2004-06-20",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
