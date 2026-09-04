import type { Season } from "../season.page-type.ts"

export const starWarsTheCloneWarsSeason2 = {
  id: "01a06802-b8bd-703d-891d-94d8687b1a5e",
  pageTypeSlug: "season",
  slug: "star-wars-the-clone-wars-season-2",
  title: "Star Wars: The Clone Wars Season 2",
  partOfSlugs: ["star-wars-the-clone-wars"],
  position: 2,
  ownLength: 487.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-02",
  externalId: "trakt-season-12743",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
