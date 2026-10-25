import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const missingTheBoat = {
  id: "01a1749a-c86a-76d8-9eb1-8cf4b7d1e287",
  type: "page-type/movie",
  slug: "missing-the-boat",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1592019",
      externalLink: "https://www.themoviedb.org/movie/1592019",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Missing the Boat",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt39096136",
  posterPath: "/8ZZgSTNMAnXB7TzZeO9mmf0xI5V.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
