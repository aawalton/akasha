import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWishList = {
  id: "01a17499-470f-7a31-b60f-1303c2ce70d7",
  type: "page-type/movie",
  slug: "the-wish-list",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "167012",
      externalLink: "https://www.themoviedb.org/movie/167012",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wish List",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt1498574",
  posterPath: "/t04MmSsi7YHUZO6FUSw6aveiByf.jpg",
  voteAverage: 6.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
