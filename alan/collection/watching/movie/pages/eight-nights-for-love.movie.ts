import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const eightNightsForLove = {
  id: "01a1749a-c869-7ca2-915d-18d611c18001",
  type: "page-type/movie",
  slug: "eight-nights-for-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773298",
      externalLink: "https://www.themoviedb.org/movie/1773298",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Eight Nights for Love",
  genres: ["Romance"],
  imdbId: "tt43746550",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
