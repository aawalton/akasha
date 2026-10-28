import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theNationalTree = {
  id: "01a17499-470f-77a7-8aff-20532aab79da",
  type: "page-type/movie",
  slug: "the-national-tree",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "34426",
      externalLink: "https://www.themoviedb.org/movie/34426",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_National_Tree" },
  ],
  title: "The National Tree",
  genres: ["Family", "Drama", "TV Movie"],
  imdbId: "tt1420568",
  posterPath: "/aNsvuioaqBir1AQV6VkycWXmxBM.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
    "streaming-service/plex",
  ],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
