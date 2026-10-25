import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMelbourneMatch = {
  id: "01a1749a-c867-7f75-ae57-68dbdcff8f04",
  type: "page-type/movie",
  slug: "a-melbourne-match",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1591916",
      externalLink: "https://www.themoviedb.org/movie/1591916",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Melbourne Match",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt38047635",
  posterPath: "/Nm49NSh8UUGtEMmTUImjZFZuAs.jpg",
  voteAverage: 6.7,
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
