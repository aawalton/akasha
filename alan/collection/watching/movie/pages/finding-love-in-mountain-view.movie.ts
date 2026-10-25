import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingLoveInMountainView = {
  id: "01a1749a-464a-72a0-aada-0ad424211ec2",
  type: "page-type/movie",
  slug: "finding-love-in-mountain-view",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "729348",
      externalLink: "https://www.themoviedb.org/movie/729348",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Finding Love in Mountain View",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt11399362",
  posterPath: "/kZIzT6ik8W951LS36tfmDfx6HB6.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
