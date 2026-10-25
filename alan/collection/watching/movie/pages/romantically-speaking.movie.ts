import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanticallySpeaking = {
  id: "01a17499-8948-7e09-a6b2-a1a7f6aaefca",
  type: "page-type/movie",
  slug: "romantically-speaking",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "403330",
      externalLink: "https://www.themoviedb.org/movie/403330",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romantically Speaking",
  genres: ["Family", "Romance", "TV Movie", "Comedy"],
  imdbId: "tt4364862",
  posterPath: "/6lsLeoKF0mlC4nmGqT1SI2TMwvy.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
