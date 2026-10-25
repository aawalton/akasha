import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveBegins = {
  id: "01a17499-66a0-786c-8780-bd41f7cfe4c1",
  type: "page-type/movie",
  slug: "love-begins",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2011-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81450",
      externalLink: "https://www.themoviedb.org/movie/81450",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Begins",
  genres: ["Drama", "Romance", "Family", "TV Movie"],
  imdbId: "tt1684907",
  posterPath: "/b0JiPlWEZ8cnhhgVOWo0rnbGuvh.jpg",
  voteAverage: 7.8,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
