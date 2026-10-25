import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const magicInMistletoe = {
  id: "01a1749a-66bf-7dfd-aab0-e18936522db1",
  type: "page-type/movie",
  slug: "magic-in-mistletoe",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180743",
      externalLink: "https://www.themoviedb.org/movie/1180743",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Magic in Mistletoe",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29233549",
  posterPath: "/uEZby0qqE7vYyZFU5hgyBf3fIm0.jpg",
  voteAverage: 6,
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
