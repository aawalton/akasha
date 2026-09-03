import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason1 = {
  id: "01a06802-b8bd-703c-a1d8-80143a51ad37",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-1",
  title: "Star Wars: The Clone Wars Season 1",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 1,
  ownLength: 499.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-10-03",
  externalId: "trakt-season-12742",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
