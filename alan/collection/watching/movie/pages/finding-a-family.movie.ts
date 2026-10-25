import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingAFamily = {
  id: "01a17499-669e-706b-8cee-8ccce4e259fe",
  type: "page-type/movie",
  slug: "finding-a-family",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2011-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "108235",
      externalLink: "https://www.themoviedb.org/movie/108235",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Finding a Family",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt1743378",
  posterPath: "/cLLaCqbTqRBdVkTweMzffzxYHvC.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
