import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const boundByASecret = {
  id: "01a17499-470b-7359-be47-a1171e0d2590",
  type: "page-type/movie",
  slug: "bound-by-a-secret",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "74487",
      externalLink: "https://www.themoviedb.org/movie/74487",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Bound by a Secret",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1225826",
  posterPath: "/p00P1eoYyH1teXQjfQ73yKVyEBA.jpg",
  voteAverage: 6.2,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
