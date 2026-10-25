import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twasTheNightBeforeChristmas = {
  id: "01a1749a-66c1-75e2-9a48-dba6c8694bb9",
  type: "page-type/movie",
  slug: "twas-the-night-before-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028547",
      externalLink: "https://www.themoviedb.org/movie/1028547",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Twas the Night Before Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22307338",
  posterPath: "/aTpIRq1CzhLiAu5zUIhVPV6cj80.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
