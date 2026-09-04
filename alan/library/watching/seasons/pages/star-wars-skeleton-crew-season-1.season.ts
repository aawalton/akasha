import type { Season } from "../season.page-type.ts"

export const starWarsSkeletonCrewSeason1 = {
  id: "01a06802-b8bd-7037-937b-0d59df6ca329",
  pageTypeSlug: "season",
  slug: "star-wars-skeleton-crew-season-1",
  title: "Star Wars: Skeleton Crew Season 1",
  partOfSlugs: ["skeleton-crew"],
  position: 1,
  ownLength: 316.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-12-03",
  externalId: "trakt-season-295476",
  externalLink: "https://trakt.tv/shows/star-wars-skeleton-crew/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
