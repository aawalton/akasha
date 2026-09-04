import type { Season } from "../season.page-type.ts"

export const accelWorldSeason1 = {
  id: "01a06802-b8b7-700a-bd48-52b37ea2bf54",
  pageTypeSlug: "season",
  slug: "accel-world-season-1",
  title: "Accel World Season 1",
  partOfSlugs: ["accel-world-2"],
  position: 1,
  ownLength: 576,
  ownProgress: 576,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2012-04-06",
  externalLink: "https://trakt.tv/shows/accel-world/seasons/1",
  lastSyncedAt: "2025-10-13",
} as const satisfies Season
