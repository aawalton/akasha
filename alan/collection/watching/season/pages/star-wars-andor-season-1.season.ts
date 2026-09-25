import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsAndorSeason1 = {
  id: "01a06802-b8bd-7028-b618-8f561d605d7f",
  type: "page-type/season",
  slug: "star-wars-andor-season-1",
  title: "Star Wars: Andor Season 1",
  partOfCollections: ["show/andor"],
  position: 1,
  ownLength: 582,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-240810",
      externalLink: "https://trakt.tv/shows/star-wars-andor/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
