import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whatIDidForLove = {
  id: "01a17497-382b-7e55-b9a9-c5b0231f7ccf",
  type: "page-type/movie",
  slug: "what-i-did-for-love",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "50611",
      externalLink: "https://www.themoviedb.org/movie/50611",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "What I Did for Love",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt0829317",
  posterPath: "/7pmk6VAB14BqO2EaXZEqe9RunGu.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
