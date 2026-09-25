import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsRebelsSeason3 = {
  id: "01a06802-b8bd-7031-8e09-8e67f52b886a",
  type: "page-type/season",
  slug: "star-wars-rebels-season-3",
  title: "Star Wars Rebels Season 3",
  partOfCollections: ["show/star-wars-rebels"],
  position: 3,
  ownLength: 523.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-25",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-129837",
      externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
