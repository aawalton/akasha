import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const campfireChristmas = {
  id: "01a1749a-4649-789d-8893-da2cca3bcd77",
  type: "page-type/movie",
  slug: "campfire-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-07-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "983224",
      externalLink: "https://www.themoviedb.org/movie/983224",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Campfire Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt20115364",
  posterPath: "/rw12jpFRX0JEt4mYrrMgyuRxc4Y.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
