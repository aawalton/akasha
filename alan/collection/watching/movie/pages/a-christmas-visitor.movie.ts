import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasVisitor = {
  id: "01a17497-195c-7441-a8b8-7068563f5453",
  type: "page-type/movie",
  slug: "a-christmas-visitor",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2002-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "26934",
      externalLink: "https://www.themoviedb.org/movie/26934",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Christmas_Visitor" },
  ],
  title: "A Christmas Visitor",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0343531",
  posterPath: "/vMqB3RZIgjk4RMUHNtAkWOrnNQz.jpg",
  voteAverage: 5.4,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
