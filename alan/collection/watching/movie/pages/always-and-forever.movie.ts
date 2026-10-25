import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const alwaysAndForever = {
  id: "01a17499-470b-7bc9-a484-c031cceb3b98",
  type: "page-type/movie",
  slug: "always-and-forever",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "269046",
      externalLink: "https://www.themoviedb.org/movie/269046",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Always and Forever",
  genres: ["Romance", "Comedy", "Drama", "TV Movie"],
  imdbId: "tt1346242",
  posterPath: "/yM4zSerjadWCnr8TnxEOczocftY.jpg",
  voteAverage: 6.1,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
