import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const missChristmas = {
  id: "01a17499-c95e-718c-8595-1a722c1be698",
  type: "page-type/movie",
  slug: "miss-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474974",
      externalLink: "https://www.themoviedb.org/movie/474974",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Miss Christmas",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt7588798",
  posterPath: "/gUDBk5ktuUJUCcCMF0G75VVo7v8.jpg",
  voteAverage: 6.271,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
