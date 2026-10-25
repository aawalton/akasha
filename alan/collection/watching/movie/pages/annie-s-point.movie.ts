import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const annieSPoint = {
  id: "01a17497-3824-7ff3-8e1e-034ae7f27e8b",
  type: "page-type/movie",
  slug: "annie-s-point",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "51091",
      externalLink: "https://www.themoviedb.org/movie/51091",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Annie's Point",
  genres: ["Drama", "Family"],
  imdbId: "tt0441733",
  posterPath: "/5fxbVbesest1TWgxgDOziR2PWWD.jpg",
  voteAverage: 5.6,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
