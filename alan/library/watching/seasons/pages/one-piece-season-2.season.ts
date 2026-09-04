import type { Season } from "../season.page-type.ts"

export const onePieceSeason2 = {
  id: "01a06802-b8bb-704e-afdc-c49d42fa6e34",
  pageTypeSlug: "season",
  slug: "one-piece-season-2",
  title: "One Piece Season 2",
  partOfSlugs: ["one-piece"],
  position: 2,
  ownLength: 388.2,
  ownProgress: 291.15,
  unitSlug: "minutes",
  status: "paused",
  rank: "B",
  publishedAt: "2001-03-21",
  externalLink: "https://trakt.tv/shows/one-piece/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
