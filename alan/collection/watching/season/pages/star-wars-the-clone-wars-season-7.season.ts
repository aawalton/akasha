import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsTheCloneWarsSeason7 = {
  id: "01a06802-b8bd-7042-a2d3-de5e8062c107",
  type: "page-type/season",
  slug: "star-wars-the-clone-wars-season-7",
  title: "Star Wars: The Clone Wars Season 7",
  partOfCollections: ["show/star-wars-the-clone-wars"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-02-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-144529",
      externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Season
