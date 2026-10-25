import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aNutcrackerChristmas = {
  id: "01a17499-a7d2-7b52-a549-2713305b2006",
  type: "page-type/movie",
  slug: "a-nutcracker-christmas",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421623",
      externalLink: "https://www.themoviedb.org/movie/421623",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Nutcracker Christmas",
  genres: ["Drama", "Family", "TV Movie", "Romance"],
  imdbId: "tt6132948",
  posterPath: "/ivwinAszWqxsi3WwwdLOKmhz3Ad.jpg",
  voteAverage: 6.3,
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
