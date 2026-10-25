import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInAngelFalls = {
  id: "01a17499-c95b-737e-99c5-c68bc1eb3e4f",
  type: "page-type/movie",
  slug: "christmas-in-angel-falls",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "483548",
      externalLink: "https://www.themoviedb.org/movie/483548",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Angel Falls",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt7704762",
  posterPath: "/4IgTSlhqoRqAFTl7rumyQ5gy60N.jpg",
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
