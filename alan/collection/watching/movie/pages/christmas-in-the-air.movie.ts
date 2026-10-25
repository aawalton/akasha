import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInTheAir = {
  id: "01a17499-c95b-7687-8b28-a93806b12120",
  type: "page-type/movie",
  slug: "christmas-in-the-air",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474981",
      externalLink: "https://www.themoviedb.org/movie/474981",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in the Air",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt6605352",
  posterPath: "/fq4oaBOE9UNUfkuRJ2lmlLLRE7H.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
