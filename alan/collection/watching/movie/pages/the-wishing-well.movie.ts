import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWishingWell = {
  id: "01a17499-470f-77ec-b005-409e13a94546",
  type: "page-type/movie",
  slug: "the-wishing-well",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112806",
      externalLink: "https://www.themoviedb.org/movie/112806",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Wishing_Well_(film)" },
  ],
  title: "The Wishing Well",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1297854",
  posterPath: "/6aE5u5CY3adepV6CVC9sEgpbWJN.jpg",
  voteAverage: 5.4,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
