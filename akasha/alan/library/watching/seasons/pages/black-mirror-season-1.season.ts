import type { Season } from "../season.page-type.ts"

export const blackMirrorSeason1 = {
  id: "01a06802-b8b8-7003-887e-064011511b4a",
  pageTypeSlug: "season",
  slug: "black-mirror-season-1",
  title: "Black Mirror Season 1",
  partOfSlugs: ["black-mirror"],
  position: 1,
  ownLength: 154.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-12-04",
  externalId: "trakt-season-53190",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
