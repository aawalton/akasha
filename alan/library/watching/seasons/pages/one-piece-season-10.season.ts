import type { Season } from "../season.page-type.ts"

export const onePieceSeason10 = {
  id: "01a06802-b8bb-7044-a9bd-1255c3d525ae",
  pageTypeSlug: "season",
  slug: "one-piece-season-10",
  title: "One Piece Season 10",
  partOfSlugs: ["one-piece"],
  position: 10,
  ownLength: 1080,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-01-06",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/10",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
