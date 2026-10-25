import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const itSBeginningToLookALotLikeChristmas = {
  id: "01a1749a-06bd-7aa0-ae9d-da30c40535fa",
  type: "page-type/movie",
  slug: "it-s-beginning-to-look-a-lot-like-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630923",
      externalLink: "https://www.themoviedb.org/movie/630923",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "It's Beginning to Look A Lot Like Christmas",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10952042",
  posterPath: "/vYEpId8nCN9wcE4cXSSqG3cw82p.jpg",
  voteAverage: 6.238,
  streamingOn: [
    "HBO Max",
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
