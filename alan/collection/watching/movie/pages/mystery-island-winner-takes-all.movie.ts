import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryIslandWinnerTakesAll = {
  id: "01a1749a-c86a-7946-aad1-b16a84cca78d",
  type: "page-type/movie",
  slug: "mystery-island-winner-takes-all",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-island"],
  position: 1,
  publishedAt: "2025-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1428262",
      externalLink: "https://www.themoviedb.org/movie/1428262",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Island: Winner Takes All",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt35660815",
  posterPath: "/sfFlXsgxnoQWePsb4UY6R27opVE.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
