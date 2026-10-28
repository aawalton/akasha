import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryIsland = {
  id: "01a1749a-89aa-7db7-9544-5c70d2ad57c9",
  type: "page-type/movie",
  slug: "mystery-island",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-island"],
  position: 1,
  publishedAt: "2023-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158706",
      externalLink: "https://www.themoviedb.org/movie/1158706",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Island",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt28524545",
  posterPath: "/vXjCRw02lLhzV1XtPjafNOSHfqo.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
