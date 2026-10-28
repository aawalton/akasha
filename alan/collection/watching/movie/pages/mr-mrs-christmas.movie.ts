import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mrMrsChristmas = {
  id: "01a1749a-c86a-74b8-b69e-929f19386b6a",
  type: "page-type/movie",
  slug: "mr-mrs-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773006",
      externalLink: "https://www.themoviedb.org/movie/1773006",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mr. & Mrs. Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt46070651",
  posterPath: "/u7i1PEzzFSF4iyS3ZPnmJ9sftEF.jpg",
  voteAverage: 10,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
