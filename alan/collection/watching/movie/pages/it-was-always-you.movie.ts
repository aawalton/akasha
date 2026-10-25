import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const itWasAlwaysYou = {
  id: "01a1749a-259b-7b4e-a192-fb04fc64ce00",
  type: "page-type/movie",
  slug: "it-was-always-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784391",
      externalLink: "https://www.themoviedb.org/movie/784391",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "It Was Always You",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13831504",
  posterPath: "/y3EoplS3g78FuFz8qzOptGinM3Y.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
