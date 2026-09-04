import type { Season } from "../season.page-type.ts"

export const blackMirrorSeason7 = {
  id: "01a06802-b8b8-7009-ae27-6123826030e7",
  pageTypeSlug: "season",
  slug: "black-mirror-season-7",
  title: "Black Mirror Season 7",
  partOfSlugs: ["black-mirror"],
  position: 7,
  ownLength: 367.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-04-10",
  externalId: "trakt-season-342449",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
