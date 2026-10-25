import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nellyKnowsMysteriesAFatalEngagement = {
  id: "01a1749a-a94c-73e8-ad4b-a0fdbf432832",
  type: "page-type/movie",
  slug: "nelly-knows-mysteries-a-fatal-engagement",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/nelly-knows-mysteries"],
  position: 0,
  publishedAt: "2024-08-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310512",
      externalLink: "https://www.themoviedb.org/movie/1310512",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nelly Knows Mysteries: A Fatal Engagement",
  genres: ["Comedy", "Mystery", "TV Movie"],
  imdbId: "tt32063324",
  posterPath: "/yZslDOULI6QJdtOAxLpJ23gW63I.jpg",
  voteAverage: 6.875,
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
