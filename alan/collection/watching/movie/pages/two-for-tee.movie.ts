import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twoForTee = {
  id: "01a1749a-c86c-713f-a440-8a25adbd2a35",
  type: "page-type/movie",
  slug: "two-for-tee",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-03-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1628522",
      externalLink: "https://www.themoviedb.org/movie/1628522",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Two for Tee",
  genres: ["Romance", "Drama"],
  imdbId: "tt39601847",
  posterPath: "/bEHc7cpqNAG6HhD24hHB1qltcy5.jpg",
  voteAverage: 6.8,
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
