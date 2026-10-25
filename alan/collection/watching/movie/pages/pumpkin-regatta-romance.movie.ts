import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pumpkinRegattaRomance = {
  id: "01a1749a-c86a-74a7-bb9f-5f884c5f0b3e",
  type: "page-type/movie",
  slug: "pumpkin-regatta-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1742854",
      externalLink: "https://www.themoviedb.org/movie/1742854",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Pumpkin Regatta Romance",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt43332291",
  posterPath: "/2W8x314AlMFYAUbca7TLGhqXOJG.jpg",
  voteAverage: 8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
