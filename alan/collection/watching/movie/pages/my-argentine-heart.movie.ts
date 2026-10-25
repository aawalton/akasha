import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myArgentineHeart = {
  id: "01a1749a-a94b-7cb8-a1a3-5816d035446f",
  type: "page-type/movie",
  slug: "my-argentine-heart",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1396984",
      externalLink: "https://www.themoviedb.org/movie/1396984",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Argentine Heart",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt34937354",
  posterPath: "/1hsu6Uy3GUQ4lZXawDyiLALToXA.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
