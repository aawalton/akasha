import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const returnToNimSIsland = {
  id: "01a17499-66a1-7142-aafe-e65e40e9bbdf",
  type: "page-type/movie",
  slug: "return-to-nim-s-island",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "172386",
      externalLink: "https://www.themoviedb.org/movie/172386",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Return_to_Nim's_Island" },
  ],
  title: "Return to Nim's Island",
  genres: ["Family", "Adventure"],
  imdbId: "tt2221648",
  posterPath: "/9LPDKDZQyGlQQphTna5kRHe4nrE.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
