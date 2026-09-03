import type { Season } from "../season.page-type.ts"

export const blackMirrorSeason5 = {
  id: "01a06802-b8b8-7007-8796-cc75362fb4d4",
  pageTypeSlug: "season",
  slug: "black-mirror-season-5",
  title: "Black Mirror Season 5",
  partOfSlugs: ["black-mirror"],
  position: 5,
  ownLength: 199.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-06-05",
  externalId: "trakt-season-190448",
  externalLink: "https://trakt.tv/shows/black-mirror/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
