import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bettySBadLuckInLove = {
  id: "01a1749a-89a7-7342-a474-891a7b16068e",
  type: "page-type/movie",
  slug: "betty-s-bad-luck-in-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180390",
      externalLink: "https://www.themoviedb.org/movie/1180390",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Betty's Bad Luck in Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt30523572",
  posterPath: "/inAybmYPu9WJwjSTgNWmqr3qzqB.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
