import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anEasterBloom = {
  id: "01a1749a-89a6-7975-aee9-05c03e8fe30b",
  type: "page-type/movie",
  slug: "an-easter-bloom",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1241978",
      externalLink: "https://www.themoviedb.org/movie/1241978",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Easter Bloom",
  genres: ["Drama"],
  imdbId: "tt30645182",
  posterPath: "/5v8UUT74F6cRO38D6I6SlvQnHOF.jpg",
  voteAverage: 7.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
