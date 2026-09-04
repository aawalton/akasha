import type { Season } from "../season.page-type.ts"

export const wednesdaySeason1 = {
  id: "01a06802-b8c0-7016-a84f-670b8fb5c737",
  pageTypeSlug: "season",
  slug: "wednesday-season-1",
  title: "Wednesday Season 1",
  partOfSlugs: ["wednesday"],
  position: 1,
  ownLength: 412.8,
  ownProgress: 412.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-11-23",
  externalId: "trakt-season-244939",
  externalLink: "https://trakt.tv/shows/wednesday/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
