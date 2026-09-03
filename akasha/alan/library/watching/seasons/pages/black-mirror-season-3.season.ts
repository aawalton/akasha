import type { Season } from "../season.page-type.ts"

export const blackMirrorSeason3 = {
  id: "01a06802-b8b8-7005-afcb-ddf711dcea27",
  pageTypeSlug: "season",
  slug: "black-mirror-season-3",
  title: "Black Mirror Season 3",
  partOfSlugs: ["black-mirror"],
  position: 3,
  ownLength: 382.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-10-21",
  externalId: "trakt-season-123126",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
