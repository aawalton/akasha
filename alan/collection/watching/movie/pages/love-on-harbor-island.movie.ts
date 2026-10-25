import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnHarborIsland = {
  id: "01a1749a-06bd-7607-b929-2f5d99df22fd",
  type: "page-type/movie",
  slug: "love-on-harbor-island",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "690211",
      externalLink: "https://www.themoviedb.org/movie/690211",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on Harbor Island",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt11864126",
  posterPath: "/pBe7UPnqfEsMesPqx4j3pHmfYJr.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
