import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingMarch3HereComesTheBride = {
  id: "01a17499-c960-7f4c-b0e5-ccf1cd0a3833",
  type: "page-type/movie",
  slug: "wedding-march-3-here-comes-the-bride",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-march"],
  position: 3,
  publishedAt: "2018-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "505720",
      externalLink: "https://www.themoviedb.org/movie/505720",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding March 3: Here Comes the Bride",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt8125466",
  posterPath: "/bYJIznyPZ7hdsnEi2Wh5JhA1dPs.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
