import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasComesHomeToCanaan = {
  id: "01a17499-669d-763e-b019-ccbf6d5246ef",
  type: "page-type/movie",
  slug: "christmas-comes-home-to-canaan",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-canaan"],
  position: 2,
  publishedAt: "2011-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "220980",
      externalLink: "https://www.themoviedb.org/movie/220980",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Comes Home to Canaan",
  genres: ["Drama", "Family", "TV Movie"],
  imdbId: "tt2006707",
  posterPath: "/wYfAPLe1hB5vHZgPMmAi2MW1NEU.jpg",
  voteAverage: 5.5,
  streamingOn: ["The CW"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T20:44:59.267Z",
} as const satisfies Movie
