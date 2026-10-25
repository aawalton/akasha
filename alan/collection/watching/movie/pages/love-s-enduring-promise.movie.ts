import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveSEnduringPromise = {
  id: "01a17497-3827-70db-b3e2-300ae396ee81",
  type: "page-type/movie",
  slug: "love-s-enduring-promise",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "20641",
      externalLink: "https://www.themoviedb.org/movie/20641",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Love's_Enduring_Promise" },
  ],
  title: "Love's Enduring Promise",
  genres: ["Drama", "Romance", "Western", "Family", "TV Movie"],
  imdbId: "tt0402348",
  posterPath: "/Aakkjr1wjTO8T2a3bPsYKGkKtLX.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
