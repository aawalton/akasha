import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const hannahSLaw = {
  id: "01a17499-669e-79c2-aa89-b2f1f33f42b9",
  type: "page-type/movie",
  slug: "hannah-s-law",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2012-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "117700",
      externalLink: "https://www.themoviedb.org/movie/117700",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Hannah's_Law" },
  ],
  title: "Hannah's Law",
  genres: ["Western", "TV Movie"],
  imdbId: "tt2082289",
  posterPath: "/13hqGcRJJUGNlv8BnmFYRz1al4x.jpg",
  voteAverage: 4.9,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
