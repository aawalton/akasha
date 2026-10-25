import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ladiesOfTheHouse = {
  id: "01a17499-470d-7010-a917-5027fcc36cdf",
  type: "page-type/movie",
  slug: "ladies-of-the-house",
  ownLength: 96,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46576",
      externalLink: "https://www.themoviedb.org/movie/46576",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Ladies_of_the_House" },
  ],
  title: "Ladies of the House",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1224368",
  posterPath: "/6mUQDb4UDNLeR7RQWJQJGvnYg7W.jpg",
  voteAverage: 4.5,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
