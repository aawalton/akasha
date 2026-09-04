import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason5 = {
  id: "01a06802-b8bd-7040-a3e7-19a22a418a58",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-5",
  title: "Star Wars: The Clone Wars Season 5",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 5,
  ownLength: 439.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-09-29",
  externalId: "trakt-season-91123",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
