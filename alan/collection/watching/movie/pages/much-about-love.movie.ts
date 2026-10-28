import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const muchAboutLove = {
  id: "01a1749a-c86a-7c92-af5d-e98d0aa7d3ec",
  type: "page-type/movie",
  slug: "much-about-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-08-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1704090",
      externalLink: "https://www.themoviedb.org/movie/1704090",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Much About Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt27860696",
  posterPath: "/47VBOUhDQLiWrePlNPCCgk2kVYO.jpg",
  voteAverage: 6.667,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
