import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const movie14LoveLetters = {
  id: "01a1749a-66bf-7f2a-b4d9-f86754901ce2",
  type: "page-type/movie",
  slug: "movie-14-love-letters",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "956001",
      externalLink: "https://www.themoviedb.org/movie/956001",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "14 Love Letters",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt15743068",
  posterPath: "/yztaCzSsuupGIm8tvrFbkfypK0f.jpg",
  voteAverage: 6.4,
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
