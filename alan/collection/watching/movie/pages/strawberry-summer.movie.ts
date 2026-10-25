import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const strawberrySummer = {
  id: "01a17499-66a1-7521-84f2-b93e8bdc0cfa",
  type: "page-type/movie",
  slug: "strawberry-summer",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "211125",
      externalLink: "https://www.themoviedb.org/movie/211125",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Strawberry Summer",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt2188926",
  posterPath: "/pOg6AIP2SGXds4aykLAuMjqBIFU.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
