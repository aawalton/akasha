import type { Season } from "../season.page-type.ts"

export const blackMirrorSeason2 = {
  id: "01a06802-b8b8-7004-a315-49a4b79d3718",
  pageTypeSlug: "season",
  slug: "black-mirror-season-2",
  title: "Black Mirror Season 2",
  partOfSlugs: ["black-mirror"],
  position: 2,
  ownLength: 133.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-02-11",
  externalId: "trakt-season-53191",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
