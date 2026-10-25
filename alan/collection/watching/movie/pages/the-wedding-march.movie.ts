import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingMarch = {
  id: "01a17499-a7d8-7506-bca8-7af74d4c8bdc",
  type: "page-type/movie",
  slug: "the-wedding-march",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-march"],
  position: 0,
  publishedAt: "2016-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "396395",
      externalLink: "https://www.themoviedb.org/movie/396395",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding March",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt5775370",
  posterPath: "/xWSpo32vTiFeb9ZCkHujNBEnuaM.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
