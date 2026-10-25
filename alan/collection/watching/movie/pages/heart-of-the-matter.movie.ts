import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartOfTheMatter = {
  id: "01a1749a-66be-7a17-a6f0-2a5bdb20a463",
  type: "page-type/movie",
  slug: "heart-of-the-matter",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "958596",
      externalLink: "https://www.themoviedb.org/movie/958596",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Heart of the Matter",
  genres: ["Drama"],
  imdbId: "tt18075790",
  posterPath: "/s1cBwvXhjf9A8CuacFzhw2hL9Gp.jpg",
  voteAverage: 5.4,
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
