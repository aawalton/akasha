import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const familyHistoryMysteriesBuriedPast = {
  id: "01a1749a-89a8-772c-83e3-4c3309424095",
  type: "page-type/movie",
  slug: "family-history-mysteries-buried-past",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1057702",
      externalLink: "https://www.themoviedb.org/movie/1057702",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Family History Mysteries: Buried Past",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt23870962",
  posterPath: "/v7a8UuloC43MUo0LP6LWdvizy37.jpg",
  voteAverage: 6.972,
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
