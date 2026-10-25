import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteriousIsland = {
  id: "01a17497-3829-71c8-91c1-34c422beabcb",
  type: "page-type/movie",
  slug: "mysterious-island",
  ownLength: 172,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940733",
      externalLink: "https://www.themoviedb.org/movie/940733",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Mysterious_Island_(2005_film)",
    },
  ],
  title: "Mysterious Island",
  genres: ["Action", "Adventure", "Fantasy", "Science Fiction", "Drama"],
  imdbId: "tt0448965",
  posterPath: "/1CcsJ5Et60tkKCtiOAF7tckcEZo.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
