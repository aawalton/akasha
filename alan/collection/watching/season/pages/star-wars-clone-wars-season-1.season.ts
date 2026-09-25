import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsCloneWarsSeason1 = {
  id: "01a06802-b8bd-702b-9b0c-c4b238de7b41",
  type: "page-type/season",
  slug: "star-wars-clone-wars-season-1",
  title: "Star Wars: Clone Wars Season 1",
  partOfCollections: ["show/clone-wars"],
  position: 1,
  ownLength: 30,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-10284",
      externalLink: "https://trakt.tv/shows/star-wars-clone-wars/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
