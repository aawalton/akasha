import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsTheCloneWarsSeason2 = {
  id: "01a06802-b8bd-703d-891d-94d8687b1a5e",
  type: "page-type/season",
  slug: "star-wars-the-clone-wars-season-2",
  title: "Star Wars: The Clone Wars Season 2",
  partOfCollections: ["show/star-wars-the-clone-wars"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-12743",
      externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Season
