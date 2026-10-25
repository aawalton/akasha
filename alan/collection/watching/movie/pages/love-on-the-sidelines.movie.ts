import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveOnTheSidelines = {
  id: "01a17499-a7d6-7c4c-9152-097e3e50f864",
  type: "page-type/movie",
  slug: "love-on-the-sidelines",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2016-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374607",
      externalLink: "https://www.themoviedb.org/movie/374607",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love on the Sidelines",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt5302658",
  posterPath: "/oPFXIYMzOX7LebQT53Bxc0R1eug.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
