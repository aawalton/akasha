import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCheerfulChristmas = {
  id: "01a1749a-06b9-7726-84d2-501550b51667",
  type: "page-type/movie",
  slug: "a-cheerful-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "642333",
      externalLink: "https://www.themoviedb.org/movie/642333",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Cheerful Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt11241514",
  posterPath: "/nFz39wwxg559fRF870HLn212Hcn.jpg",
  voteAverage: 5.6,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
