import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const crimetimeFreefall = {
  id: "01a1749a-a949-7707-975c-7dd81776fea5",
  type: "page-type/movie",
  slug: "crimetime-freefall",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1229760",
      externalLink: "https://www.themoviedb.org/movie/1229760",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "CrimeTime: Freefall",
  genres: ["Drama", "Mystery", "Thriller"],
  imdbId: "tt31068356",
  posterPath: "/8pddM9iuWWCgBf0GXIqco8iMb5k.jpg",
  voteAverage: 8.056,
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
