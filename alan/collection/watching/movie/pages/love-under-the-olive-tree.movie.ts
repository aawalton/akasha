import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveUnderTheOliveTree = {
  id: "01a1749a-06bd-7ac4-bee8-8ba3a8e782f9",
  type: "page-type/movie",
  slug: "love-under-the-olive-tree",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "627456",
      externalLink: "https://www.themoviedb.org/movie/627456",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Under the Olive Tree",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10782366",
  posterPath: "/hAw4AUAHER1IYJpyVCf4GLfNtWj.jpg",
  voteAverage: 6,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
