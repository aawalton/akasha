import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason3 = {
  id: "01a06802-b8bd-703e-8cbf-95eeb4c48794",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-3",
  title: "Star Wars: The Clone Wars Season 3",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 3,
  ownLength: 486,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-09-17",
  externalId: "trakt-season-12744",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
