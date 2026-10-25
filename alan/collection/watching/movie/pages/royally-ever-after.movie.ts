import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const royallyEverAfter = {
  id: "01a17499-c95f-78d6-a88d-ba3ae6560a10",
  type: "page-type/movie",
  slug: "royally-ever-after",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "520409",
      externalLink: "https://www.themoviedb.org/movie/520409",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Royally Ever After",
  genres: ["Drama", "TV Movie", "Comedy", "Romance"],
  imdbId: "tt8433858",
  posterPath: "/1k5HpDPTWGIh24cvW5wQmV7YOuP.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
