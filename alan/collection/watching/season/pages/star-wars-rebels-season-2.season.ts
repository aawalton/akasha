import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsRebelsSeason2 = {
  id: "01a06802-b8bd-7030-9449-1fd3a5832c1c",
  type: "page-type/season",
  slug: "star-wars-rebels-season-2",
  title: "Star Wars Rebels Season 2",
  partOfCollections: ["show/star-wars-rebels"],
  position: 2,
  ownLength: 475.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-103107",
      externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
