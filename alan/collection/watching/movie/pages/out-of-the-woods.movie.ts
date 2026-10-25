import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const outOfTheWoods = {
  id: "01a17497-382a-7c73-b289-0f14e1ebfda8",
  type: "page-type/movie",
  slug: "out-of-the-woods",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2005-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "81757",
      externalLink: "https://www.themoviedb.org/movie/81757",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Out of the Woods",
  genres: ["Drama", "Romance", "Family", "TV Movie"],
  imdbId: "tt0420818",
  posterPath: "/aBvbFAvuFmKmTAOHo8xcuDrowyC.jpg",
  voteAverage: 5.7,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
