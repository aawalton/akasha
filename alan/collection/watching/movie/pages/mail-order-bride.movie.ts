import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mailOrderBride = {
  id: "01a17499-470d-7a59-8c0c-de4df189067d",
  type: "page-type/movie",
  slug: "mail-order-bride",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "71007",
      externalLink: "https://www.themoviedb.org/movie/71007",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Mail_Order_Bride_(2008_film)",
    },
  ],
  title: "Mail Order Bride",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt1320431",
  posterPath: "/mxVfRKyXtxzKMwLei6SQXFoW3jd.jpg",
  voteAverage: 6.5,
  streamingOn: ["Howdy Amazon Channel", "YouTube Free"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
