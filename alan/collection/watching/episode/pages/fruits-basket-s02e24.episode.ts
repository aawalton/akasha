import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fruitsBasketS02e24 = {
  id: "01a183d3-70a9-7c8e-92c9-bed7fb64f166",
  type: "page-type/episode",
  slug: "fruits-basket-s02e24",
  description:
    "Another New Year’s means another banquet for the zodiac members at the Soma estate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fruits-basket-season-2"],
  position: 24,
  publishedAt: "2020-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2418009",
      externalLink: "https://www.themoviedb.org/tv/85991/season/2/episode/24",
    },
  ],
  title: "Here You Are",
  episodeType: "standard",
  stillPath: "/6D0vpFVF0FOfNDr4sPosIDOZewA.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:43:54.662Z",
  updatedAt: "2026-10-28T18:43:54.662Z",
} as const satisfies Episode
