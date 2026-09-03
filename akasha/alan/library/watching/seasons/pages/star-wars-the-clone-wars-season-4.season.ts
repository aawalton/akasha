import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason4 = {
  id: "01a06802-b8bd-703f-a37b-468782dc1ddd",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-4",
  title: "Star Wars: The Clone Wars Season 4",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 4,
  ownLength: 486,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-09-16",
  externalId: "trakt-season-12745",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
