import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rockyMountainChristmas = {
  id: "01a17499-c95e-7f4c-8baa-b3f24b001364",
  type: "page-type/movie",
  slug: "rocky-mountain-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "491761",
      externalLink: "https://www.themoviedb.org/movie/491761",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rocky Mountain Christmas",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt7643644",
  posterPath: "/314Nw750L4PoQj0ypMB1gKnA0e0.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "Runtime",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
