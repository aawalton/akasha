import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const babySFirstChristmas = {
  id: "01a17499-669d-76de-934e-dcb09dc78f1f",
  type: "page-type/movie",
  slug: "baby-s-first-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2012-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "150641",
      externalLink: "https://www.themoviedb.org/movie/150641",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Baby's First Christmas",
  genres: ["Romance", "Drama", "TV Movie"],
  imdbId: "tt2289406",
  posterPath: "/wSrXfoUi2YV2l2CxuyVdZgl9og.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
