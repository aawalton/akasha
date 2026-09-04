import type { Season } from "../season.page-type.ts"

export const onePieceSeason13 = {
  id: "01a06802-b8bb-7047-b59e-0661f592c548",
  pageTypeSlug: "season",
  slug: "one-piece-season-13",
  title: "One Piece Season 13",
  partOfSlugs: ["one-piece"],
  position: 13,
  ownLength: 2424,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-18",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/13",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
