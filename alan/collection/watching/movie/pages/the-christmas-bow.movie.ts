import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasBow = {
  id: "01a1749a-259e-7a44-8a8a-5461455e6812",
  type: "page-type/movie",
  slug: "the-christmas-bow",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737794",
      externalLink: "https://www.themoviedb.org/movie/737794",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Bow",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13357258",
  posterPath: "/aYhWFeMdknJlrV7AZY70rk7XStw.jpg",
  voteAverage: 6.926,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
